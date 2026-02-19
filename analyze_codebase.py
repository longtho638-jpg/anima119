import os
import re
import ast

def get_ts_files(root_dir):
    ts_files = []
    for root, dirs, files in os.walk(root_dir):
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if '.next' in dirs:
            dirs.remove('.next')
        for file in files:
            if file.endswith('.ts') or file.endswith('.tsx'):
                ts_files.append(os.path.join(root, file))
    return ts_files

def resolve_import(import_path, current_file_path, root_dir):
    # Handle alias @/
    if import_path.startswith('@/'):
        target_path = os.path.join(root_dir, import_path[2:])
    elif import_path.startswith('.'):
        target_path = os.path.normpath(os.path.join(os.path.dirname(current_file_path), import_path))
    else:
        return None # External library or absolute path not handled

    # Try extensions
    extensions = ['.ts', '.tsx', '/index.ts', '/index.tsx']

    # Check if exact match (rare for imports but possible)
    if os.path.isfile(target_path):
        return target_path

    for ext in extensions:
        test_path = target_path + ext
        if os.path.isfile(test_path):
            return test_path

    # Check if it is a directory index
    if os.path.isdir(target_path):
         for ext in ['/index.ts', '/index.tsx']:
            test_path = target_path + ext
            if os.path.isfile(test_path):
                return test_path

    return None

def extract_imports(file_path):
    imports = []
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Regex for static imports
        # import ... from '...'
        import_patterns = [
            r'import\s+.*?\s+from\s+[\'"](.*?)[\'"]',
            r'import\s+[\'"](.*?)[\'"]', # Side-effect import
            r'export\s+.*?\s+from\s+[\'"](.*?)[\'"]' # Re-export
        ]

        for pattern in import_patterns:
            matches = re.findall(pattern, content, re.DOTALL)
            imports.extend(matches)

        # Dynamic imports: import('...')
        dynamic_import_pattern = r'import\s*\(\s*[\'"](.*?)[\'"]\s*\)'
        dynamic_matches = re.findall(dynamic_import_pattern, content)
        imports.extend(dynamic_matches)

    except Exception as e:
        print(f"Error reading {file_path}: {e}")
    return imports

def build_graph(root_dir):
    files = get_ts_files(os.path.join(root_dir, 'src'))
    graph = {f: set() for f in files}

    for file in files:
        raw_imports = extract_imports(file)
        for imp in raw_imports:
            resolved = resolve_import(imp, file, root_dir)
            if resolved and resolved in graph:
                graph[file].add(resolved)
    return graph

def find_cycles(graph):
    visited = set()
    stack = set()
    cycles = []

    def dfs(node, path):
        visited.add(node)
        stack.add(node)
        path.append(node)

        if node in graph:
            for neighbor in graph[node]:
                if neighbor not in visited:
                    dfs(neighbor, path)
                elif neighbor in stack:
                    # Found cycle
                    cycle_start_index = path.index(neighbor)
                    cycles.append(path[cycle_start_index:])

        stack.remove(node)
        path.pop()

    for node in graph:
        if node not in visited:
            dfs(node, [])

    return cycles

def find_unused_files(graph, root_dir):
    # Entry points that should strictly be ignored
    ignored_patterns = [
        r'src/app/.*page\.tsx$',
        r'src/app/.*layout\.tsx$',
        r'src/app/.*loading\.tsx$',
        r'src/app/.*error\.tsx$',
        r'src/app/.*not-found\.tsx$',
        r'src/app/.*route\.ts$',
        r'src/middleware\.ts$',
        r'src/app/robots\.ts$',
        r'src/app/sitemap\.ts$',
        r'src/app/template\.tsx$',
        r'.*\.test\.ts$',
        r'.*jest\.setup\.ts$'
    ]

    all_files = set(graph.keys())
    referenced_files = set()

    for deps in graph.values():
        referenced_files.update(deps)

    unused = all_files - referenced_files

    filtered_unused = []
    for file in unused:
        is_ignored = False
        rel_path = os.path.relpath(file, root_dir)
        for pattern in ignored_patterns:
            if re.match(pattern, rel_path):
                is_ignored = True
                break
        if not is_ignored:
            filtered_unused.append(rel_path)

    return filtered_unused

def main():
    root_dir = os.getcwd()
    print(f"Analyzing {root_dir}...")

    graph = build_graph(root_dir)

    # 1. Circular Dependencies
    cycles = find_cycles(graph)
    print(f"\nFound {len(cycles)} circular dependencies:")
    for i, cycle in enumerate(cycles):
        print(f"Cycle {i+1}:")
        # Format for readability
        simple_cycle = [os.path.relpath(p, root_dir) for p in cycle]
        print(" -> ".join(simple_cycle))
        print(" -> " + simple_cycle[0]) # Close the loop

    # 2. Unused Files
    unused = find_unused_files(graph, root_dir)
    print(f"\nFound {len(unused)} potentially unused files:")
    for file in sorted(unused):
        print(file)

if __name__ == "__main__":
    main()
