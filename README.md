#### **MisGastos - Invoice Management System (First Iteration)**

###### Description

MisGastos is the first iteration of a set of tools designed to register, manage, and visualize expenses efficiently.

This version focuses on invoice management, providing basic functionalities to create, edit, delete, and filter invoices, while automatically calculating VAT and totals.

The interface is designed for Spanish-speaking users and the code is modular, allowing easy scalability for future financial management tools.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



###### **Features of this first iteration**

**Routing system (Router module) for single-page navigation:**
*Hash-based routing (#startPage, #registerPage).
*Dynamic section activation using active class.
*Prevents revisiting the landing page once accessed.
*Automatically runs the logic of the active page module.

* Login modal with email and password validation (simulated).
  
** Invoice registration/edit form:**
* Auto-generated document ID (read-only).
* Automatic calculation of VAT and total based on subtotal and VAT percentage.
* Dynamic selects for currency, cost center, and user.
  
**Invoice table with:**
* Dynamic filtering by selected fields.
* View, edit, and delete buttons for each record.
* Automatic persistence in localStorage.
  
* Input validation with visual feedback (is-valid / is-invalid).
* Modular code following a simplified MVC pattern.
* English comments in code for easier developer comprehension.
  

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



###### **Project Structure**



src/

│

├─ main.js                  # Entry point, initializes modules

├─ state/

│  └─ stateManager.js       # Global state management and subscription

├─ router/

│  └─ router.js             # Hash-based navigation controller

├─ utils/

│  └─ utils.js              # Helper functions (formatting, ID generation)

├─ landingConsts/

│  └─ landingConsts.js      # Login element references

├─ formModule/

│  ├─ formView.js           # Form rendering, validation, and calculations

│  └─ formConsts/

│     └─ formConsts.js      # Input and select references

├─ tableModule/

│  ├─ tableController.js    # Table controller and event handling

│  ├─ tableView.js          # Table rendering and summary

│  └─ tableConsts/

│     └─ tableConsts.js     # Initial form data

└─ apiFake/

   └─ dataMock.js           # Mock data for testing



\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



###### **Usage Step by Step**

**1. Routing**

**The system uses hash-based routes:**

*#startPage → Landing/login page
*#registerPage → Invoice management page

**When navigating between routes:**

*All sections are hidden, and the active one gets the class active.
*Each page module executes its specific initialization logic.
*startPage can only be visited once (controlled by the router).

**2. Login**



* Click the "Iniciar sesión" button at the top-right.
* A modal will appear with email and password fields.
* Both fields are required:
* Empty or invalid inputs will display a red border (is-invalid) with an error message.
* Correct inputs will display a success alert (simulated login).
* Close the modal with × or proceed to the invoice form.



**3. Create a New Invoice**



* Click the "+ Agregar Factura" button below the table.
* The invoice form opens:
* Document ID is auto-generated and read-only.
* Fill in required fields: Document Number, RUC, Legal Name, Date, Currency, Subtotal, VAT %, Cost Center, User.
* Description and file attachment are optional.
* Calculated fields (VAT and Total) update automatically.
* Click "Guardar" to save:

 	Invalid or empty fields will prevent submission.

 	After saving, the form resets and the new invoice appears in the table.



**4. Edit or View Existing Invoices**



Each table row includes buttons:

* View: Opens the form in read-only mode.
* Edit: Allows modifying the invoice.
* Delete: Removes the invoice after confirmation.



**5. Filter and Sort Invoices**



Filter:

*  	Select a field in "Filtrar por" (e.g., RUC, Date, Currency).
*  	The second input or select will appear for value selection.
*  	The table updates dynamically based on the filter.



Sort:



Use sorting buttons:

*  	Newest / Oldest (by date).
*  	Highest / Lowest (by total).
*  	The table updates automatically according to the selected criteria.



**6. Table Summary**



Below the table, a summary displays:

&nbsp;	Records: Number of visible invoices.

&nbsp;	Total by Currency: Sum of totals grouped by currency.



**7. Persistence**

•	All changes are automatically saved in localStorage.

•	Reloading the page retains all invoices and their state.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



###### **Development Notes**

•	First iteration: Focuses only on invoice management.

•	Modular structure: Form, table, and login modules are decoupled.

•	Global state management: stateManager.js handles state and subscriptions.

•	Validation: Applied only to visible input fields; calculated fields are read-only.

•	Automatic calculations: VAT and total update in real time based on subtotal and VAT percentage.

•	Scalable architecture: Designed to expand into a complete expense management suite in future iterations.



\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



###### **Technologies**

•	HTML5, CSS3

•	JavaScript (ES Modules)

•	LocalStorage for persistence

•	Vanilla JS modular approach

•	Hash-based Router for single-page navigation

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



###### **Future Improvements**


* PDF export of invoices
* Fully responsive design for mobile devices
* Integration with remote databases
* Additional modules for general expense management (categories, reports, budgets)
* Modern notifications (toast messages)
