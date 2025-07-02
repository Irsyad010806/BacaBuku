import tkinter as tk
from tkinter import filedialog
import fitz  # PyMuPDF
from PIL import Image, ImageTk

class PDFViewer:
    def __init__(self, root):
        self.root = root
        self.root.title("PDF Book Viewer")
        
        # Tombol untuk memilih file
        self.open_btn = tk.Button(root, text="Buka PDF", command=self.open_pdf)
        self.open_btn.pack(pady=10)
        
        # Area untuk menampilkan PDF
        self.canvas = tk.Canvas(root)
        self.canvas.pack(expand=True, fill='both')
        
        # Tombol navigasi
        self.nav_frame = tk.Frame(root)
        self.nav_frame.pack(pady=10)
        
        self.prev_btn = tk.Button(self.nav_frame, text="Sebelumnya", command=self.prev_page)
        self.prev_btn.pack(side=tk.LEFT, padx=5)
        
        self.next_btn = tk.Button(self.nav_frame, text="Selanjutnya", command=self.next_page)
        self.next_btn.pack(side=tk.LEFT, padx=5)
        
        self.current_page = 0
        self.doc = None
        
    def open_pdf(self):
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
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))  # Zoom 2x
        
        # Konversi ke format yang bisa ditampilkan tkinter
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        photo = ImageTk.PhotoImage(img)
        
        # Update canvas
        self.canvas.delete("all")
        self.canvas.config(width=pix.width, height=pix.height)
        self.canvas.create_image(0, 0, anchor='nw', image=photo)
        self.canvas.image = photo  # Simpan referensi
        
    def next_page(self):
        if self.doc and self.current_page < len(self.doc) - 1:
            self.current_page += 1
            self.show_page()
            
    def prev_page(self):
        if self.doc and self.current_page > 0:
            self.current_page -= 1
            self.show_page()

if __name__ == "__main__":
    root = tk.Tk()
    app = PDFViewer(root)
    root.mainloop()
