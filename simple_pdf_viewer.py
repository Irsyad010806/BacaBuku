import tkinter as tk
from tkinter import filedialog
import fitz  # PyMuPDF
from PIL import Image, ImageTk

class SimplePDFViewer:
    def __init__(self):
        self.window = tk.Tk()
        self.window.title("Simple PDF Viewer")
        
        # Buat tombol untuk membuka file
        self.open_button = tk.Button(self.window, text="Buka PDF", command=self.open_file)
        self.open_button.pack(pady=10)
        
        # Canvas untuk menampilkan PDF
        self.canvas = tk.Canvas(self.window)
        self.canvas.pack(expand=True, fill='both')
        
        # Tombol navigasi
        self.nav_frame = tk.Frame(self.window)
        self.nav_frame.pack(pady=5)
        
        self.prev_button = tk.Button(self.nav_frame, text="<<", command=self.prev_page)
        self.prev_button.pack(side=tk.LEFT, padx=5)
        
        self.next_button = tk.Button(self.nav_frame, text=">>", command=self.next_page)
        self.next_button.pack(side=tk.LEFT, padx=5)
        
        self.current_page = 0
        self.doc = None
        
    def open_file(self):
        file_path = filedialog.askopenfilename(filetypes=[("PDF files", "*.pdf")])
        if file_path:
            if self.doc:
                self.doc.close()
            self.doc = fitz.open(file_path)
            self.current_page = 0
            self.show_page()
    
    def show_page(self):
        if not self.doc:
            return
        
        page = self.doc[self.current_page]
        pix = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5))
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        photo = ImageTk.PhotoImage(img)
        
        self.canvas.delete("all")
        self.canvas.config(width=pix.width, height=pix.height)
        self.canvas.create_image(0, 0, anchor='nw', image=photo)
        self.canvas.image = photo
        
    def prev_page(self):
        if self.doc and self.current_page > 0:
            self.current_page -= 1
            self.show_page()
    
    def next_page(self):
        if self.doc and self.current_page < len(self.doc) - 1:
            self.current_page += 1
            self.show_page()
    
    def run(self):
        self.window.mainloop()

if __name__ == "__main__":
    viewer = SimplePDFViewer()
    viewer.run()
