import tkinter as tk
from tkinter import messagebox, ttk
import requests

class TicketApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Ticket Management System")
        self.root.geometry("800x600")  

        self.base_url = "http://localhost:8000/api"
        self.token = None

        self.login_frame = tk.Frame(root, padx=20, pady=20)
        self.ticket_frame = None
        self.detail_frame = None

        self.create_login_frame()
    
    def create_login_frame(self):
        self.clear_frame()

        tk.Label(self.login_frame, text="Email", font=("Helvetica", 14)).grid(row=0, column=0, pady=10, sticky="e")
        tk.Label(self.login_frame, text="Password", font=("Helvetica", 14)).grid(row=1, column=0, pady=10, sticky="e")
        
        self.email_entry = tk.Entry(self.login_frame, font=("Helvetica", 14), width=30)
        self.password_entry = tk.Entry(self.login_frame, show="*", font=("Helvetica", 14), width=30)
        self.email_entry.grid(row=0, column=1, pady=10)
        self.password_entry.grid(row=1, column=1, pady=10)

        tk.Button(self.login_frame, text="Login", command=self.login, font=("Helvetica", 14), width=20).grid(row=2, columnspan=2, pady=20)

        self.login_frame.pack()

    def create_ticket_frame(self):
        self.clear_frame()
        self.ticket_frame = tk.Frame(self.root, padx=20, pady=20)

        tk.Button(self.ticket_frame, text="Refresh", command=self.fetch_tickets, font=("Helvetica", 14), width=20).pack(pady=10)

        columns = ("ID", "Objet", "Description", "Status", "Category", "Date de Création")
        self.ticket_tree = ttk.Treeview(self.ticket_frame, columns=columns, show='headings', height=15)
        
        for col in columns:
            self.ticket_tree.heading(col, text=col, command=lambda c=col: self.sort_by(c))
            self.ticket_tree.column(col, anchor='center')

        self.ticket_tree.pack(pady=10)

        self.ticket_tree.bind("<Double-1>", self.open_ticket_detail)

        self.ticket_frame.pack()

        self.fetch_tickets()

    def sort_by(self, column):
        items = [(self.ticket_tree.set(k, column), k) for k in self.ticket_tree.get_children('')]

        
        if column == "Date de Création":
            items.sort(key=lambda t: self.parse_date(t[0]))
        else:
            items.sort()

        for index, (val, k) in enumerate(items):
            self.ticket_tree.move(k, '', index)

    def parse_date(self, date_str):
        from datetime import datetime
        try:
            return datetime.strptime(date_str, '%Y-%m-%d %H:%M:%S')
        except ValueError:
            return datetime.min

    def fetch_tickets(self):
        headers = {"Authorization": f"Bearer {self.token}"}

        response = requests.get(f"{self.base_url}/tickets", headers=headers)
        
        if response.status_code == 200:
            for item in self.ticket_tree.get_children():
                self.ticket_tree.delete(item)
            
            try:
                tickets_response = response.json()
                tickets = tickets_response['data']
                for ticket in tickets:
                    category_name = ticket.get('category_name', 'Unknown')
                    created_at = ticket.get('created_at', 'Unknown')
                    self.ticket_tree.insert("", "end", values=(ticket['id'], ticket['objet'], ticket['description'], ticket['status'], category_name, created_at))
            except requests.exceptions.JSONDecodeError as e:
                messagebox.showerror("Error", f"Error decoding JSON: {e}")
            except KeyError as e:
                messagebox.showerror("Error", f"Key error: {e}")
        else:
            messagebox.showerror("Error", "Failed to fetch tickets")

    def create_detail_frame(self, ticket_id):
        self.clear_frame()

        container = tk.Frame(self.root, padx=20, pady=20)
        container.pack(expand=True, fill="both")

        self.detail_canvas = tk.Canvas(container)
        self.scrollbar = tk.Scrollbar(container, orient="vertical", command=self.detail_canvas.yview)
        self.detail_canvas.configure(yscrollcommand=self.scrollbar.set)

        self.scrollbar.pack(side="right", fill="y")
        self.detail_canvas.pack(side="left", fill="both", expand=True)

        self.detail_frame = tk.Frame(self.detail_canvas)
        self.detail_canvas.create_window((0, 0), window=self.detail_frame, anchor="n")

        self.detail_frame.bind("<Configure>", lambda event, canvas=self.detail_canvas: self.on_frame_configure(canvas))

        ticket = self.fetch_ticket_details(ticket_id)
        if not ticket:
            return

        tk.Label(self.detail_frame, text=f"Objet: {ticket['objet']}", font=("Helvetica", 14)).pack(pady=10)
        tk.Label(self.detail_frame, text=f"Description: {ticket['description']}", font=("Helvetica", 14)).pack(pady=10)
        tk.Label(self.detail_frame, text=f"Status: {ticket['status']}", font=("Helvetica", 14)).pack(pady=10)

        tk.Label(self.detail_frame, text="Notes:", font=("Helvetica", 14)).pack(pady=10)
        for note in ticket['ticket_notes']:
            tk.Label(self.detail_frame, text=note['note'], font=("Helvetica", 12), wraplength=600, justify="left").pack(pady=5)

        self.note_entry = tk.Text(self.detail_frame, font=("Helvetica", 14), width=60, height=5)
        self.note_entry.pack(pady=10)

        button_frame = tk.Frame(self.detail_frame)
        button_frame.pack(pady=10)

        tk.Button(button_frame, text="Ajouter une note", command=lambda: self.update_ticket(ticket_id, ''), font=("Helvetica", 14), width=15).grid(row=0, column=0, padx=5, pady=5)

        if ticket['status'] != 'new':
            tk.Button(button_frame, text="Nouveau", command=lambda: self.update_ticket(ticket_id, 'new'), font=("Helvetica", 14), width=15).grid(row=0, column=1, padx=5, pady=5)
        if ticket['status'] != 'fixed':
            tk.Button(button_frame, text="Traité", command=lambda: self.update_ticket(ticket_id, 'fixed'), font=("Helvetica", 14), width=15).grid(row=0, column=2, padx=5, pady=5)
        if ticket['status'] != 'closed':
            tk.Button(button_frame, text="Fermé", command=lambda: self.update_ticket(ticket_id, 'closed'), font=("Helvetica", 14), width=15).grid(row=0, column=3, padx=5, pady=5)
        if ticket['status'] != 'In process':
            tk.Button(button_frame, text="En cours d'execution", command=lambda: self.update_ticket(ticket_id, 'In process'), font=("Helvetica", 14), width=15).grid(row=0, column=4, padx=5, pady=5)
        
        tk.Button(self.detail_frame, text="Retour", command=self.create_ticket_frame, font=("Helvetica", 14), width=20).pack(pady=20)

    def on_frame_configure(self, canvas):
        canvas.configure(scrollregion=canvas.bbox("all"))

    def clear_frame(self):
        for widget in self.root.winfo_children():
            widget.pack_forget()

    def login(self):
        email = self.email_entry.get()
        password = self.password_entry.get()

        response = requests.post(f"{self.base_url}/login", data={"email": email, "password": password})
        
        if response.status_code == 200:
            self.token = response.json().get("access_token")
            self.user_id = response.json().get("user", {}).get("user_id")
            self.create_ticket_frame()
        else:
            error_message = response.json().get("message", "Une erreur inconnue est survenue.")
            messagebox.showerror("Échec de la connexion", error_message)

    def fetch_ticket_details(self, ticket_id):
        headers = {"Authorization": f"Bearer {self.token}"}
        response = requests.get(f"{self.base_url}/tickets/{ticket_id}", headers=headers)

        if response.status_code == 200:
            return response.json()
        else:
            messagebox.showerror("Error", "Failed to fetch ticket details")
            return None

    def open_ticket_detail(self, event):
        if not self.ticket_tree.selection():
            return

        item = self.ticket_tree.selection()[0]
        ticket_id = self.ticket_tree.item(item, "values")[0]

        self.create_detail_frame(ticket_id)

    def update_ticket(self, ticket_id, status):
        note_text = self.note_entry.get("1.0", tk.END).strip()
        headers = {"Authorization": f"Bearer {self.token}"}
        response = requests.patch(f"{self.base_url}/tickets/{ticket_id}", 
                                  json={"status": status, "note": note_text, "user_id": self.user_id}, 
                                  headers=headers)

        if response.status_code == 200:
            messagebox.showinfo("Success", "updated successfully")
            self.create_detail_frame(ticket_id)
        else:
            messagebox.showerror("Error", "Failed to update ticket")


if __name__ == "__main__":
    root = tk.Tk()
    app = TicketApp(root)
    root.mainloop()
