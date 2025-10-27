import os

def combine_program_files(directory_path, output_filename="combined_code.txt"):
    """
    Traverses a directory, reads the content of program files,
    and combines them into a single output file, excluding specified directories.

    Args:
        directory_path (str): The path to the directory to be scanned.
        output_filename (str): The name of the file to store the combined code.
    """
    # A list of common programming file extensions to look for.
    # You can customize this list to include or exclude file types.
    programming_extensions = [
        '.py', '.java', '.c', '.h', '.cpp', '.hpp', '.js', '.html', '.css',
        '.ts', '.cs', '.go', '.php', '.rb', '.swift', '.kt', '.scala', '.m',
        '.json', '.yml', '.yaml', '.md' # Menambahkan beberapa tipe file umum
    ]
    
    # --- PERUBAHAN DIMULAI DI SINI ---
    # Daftar direktori yang ingin dikecualikan dari pencarian.
    excluded_dirs = ['node_modules', 'venv', '.git', '__pycache__', 'dist', 'build']
    # --- AKHIR PERUBAHAN ---

    # Check if the provided path is a valid directory.
    if not os.path.isdir(directory_path):
        print(f"Error: The path '{directory_path}' is not a valid directory.")
        return

    with open(output_filename, 'w', encoding='utf-8') as outfile:
        # os.walk secara rekursif menelusuri pohon direktori.
        for dirpath, dirnames, filenames in os.walk(directory_path):
            
            # --- PERUBAHAN DIMULAI DI SINI ---
            # Modifikasi 'dirnames' di tempat untuk mencegah os.walk mengunjungi
            # direktori yang dikecualikan. Ini adalah cara yang paling efisien.
            dirnames[:] = [d for d in dirnames if d not in excluded_dirs]
            # --- AKHIR PERUBAHAN ---

            for filename in filenames:
                # Check if the file has one of the specified extensions.
                if any(filename.endswith(ext) for ext in programming_extensions):
                    file_path = os.path.join(dirpath, filename)
                    
                    try:
                        with open(file_path, 'r', encoding='utf-8', errors='ignore') as infile:
                            # Tulis header untuk setiap file untuk mengidentifikasi isinya.
                            outfile.write(f"\n{'='*50}\n")
                            outfile.write(f"// File: {file_path}\n")
                            outfile.write(f"{'='*50}\n\n")
                            
                            # Tulis konten file ke file output.
                            outfile.write(infile.read())
                            outfile.write("\n")
                            
                    except Exception as e:
                        print(f"Could not read file {file_path}: {e}")

    print(f"All program files have been combined into '{output_filename}'")

if __name__ == "__main__":
    # Minta pengguna memasukkan path direktori.
    folder_path = input("Enter the path to the folder: ")
    combine_program_files(folder_path)