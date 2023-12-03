import os

def create_directory_structure(root_dir):
    # Create project root directory
    os.makedirs(root_dir)

    # Create client directory
    client_dir = os.path.join(root_dir, 'client')
    os.makedirs(client_dir)

    # Create client subdirectories
    client_subdirs = ['public', 'src']
    for subdir in client_subdirs:
        os.makedirs(os.path.join(client_dir, subdir))

    # Create src subdirectories
    src_subdirs = ['components', 'pages', 'styles', 'utils']
    for subdir in src_subdirs:
        os.makedirs(os.path.join(client_dir, 'src', subdir))

    # Create server directory
    server_dir = os.path.join(root_dir, 'server')
    os.makedirs(server_dir)

    # Create server subdirectories
    server_subdirs = ['config', 'controllers', 'middleware', 'models', 'routes', 'services']
    for subdir in server_subdirs:
        os.makedirs(os.path.join(server_dir, subdir))

    # Create database, scripts, logs, public, and tests directories
    for subdir in ['database', 'scripts', 'logs', 'public', 'tests']:
        os.makedirs(os.path.join(root_dir, subdir))

    # Create required files
    for file_name, content in [('app.js', ''), ('.env', ''), ('.gitignore', ''), ('README.md', '')]:
        with open(os.path.join(root_dir, file_name), 'w') as file:
            file.write(content)

if __name__ == "__main__":
    project_root = "project-root"
    create_directory_structure(project_root)
    print(f"Project structure created at '{project_root}'.")
