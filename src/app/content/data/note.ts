export const BranchNote: string[] = [
  "Department Name: Enter the name of the department. This field is mandatory.",
  "Description: Provide an optional brief description for the department.",
  "Status: Use the toggle switch to set the department as active or inactive.",
];

export const CategoryMdlNote: string[] = [
  "Here you can create new categories for tickets.",
  "Category For : This option is deside, this category is for which portal. (Both of both portal, internal of admin portal and external of customer portal.).",
  "Category For : The category type is used to classify tickets according to the service or transaction they relate to.",
  "Customer Type : Customer Type in the customer portal helps determine whether a customer is existing or not when a ticket is created.",
  "Auto Assign : If Auto Assign is enabled, this category will be automatically assigned to a user when a new account is created.",
];

export const SubCategoryMdlNote: string[] = [
  "Here you can create a new sub-category under a ticket category.",
  "Sub-Category For : This option determines which portal the sub-category belongs to (Both Portals, Internal/Admin Portal, or Customer Portal).",
  "Sub-Category Type : Used to classify tickets based on the service or transaction they are related to.",
  "Customer Type : Helps determine whether the customer is existing or new when a ticket is created through the customer portal.",
  "Auto Assign : If enabled, tickets created under this sub-category will be automatically assigned to a user.",
  "Escalation Assignment : By default, sub-categories inherit escalation settings from the parent category. Disable 'Take Configuration from Category' to configure custom escalation intervals.",
];

export const DynamicColumnNote: string[] = [
  "Field Type : Select whether the field should be displayed for Ticket creation, Reply, or remain Dynamic.",
  "Column For : Choose the portal where this field will be available (Both, Internal, or External).",
  "Ticket Type : Specify whether the field applies to Service tickets, Transaction tickets, or both.",
  "Customer Type : Define whether the field is visible for Existing customers, Non-Existing customers, or both.",
  "Input Type : Select the type of input control such as Text Box, Combo Box, Radio Button, Checkbox, Date Picker, etc.",
  "Display Name : Enter the label that will be displayed to users on the form.",
  "Options : For Combo Box, Radio Button, or Checkbox fields, add the available option values.",
  "Store Securely : Enable this option to securely store sensitive information entered in the field.",
  "Display Mask : Enable masking to hide sensitive field values from users.",
];

export const FormMappingNote: string[] = [
  "Select the appropriate Category and Sub Category to begin mapping.",
  "Define the parent Columns and corresponding Sub Columns details.",
  "Use the search bar to quickly filter display names in the mapping table.",
  "Check the selection box next to fields like First Name, Last Name, and Age to map them.",
  "Toggle the 'Required' switch to enforce mandatory fields for users.",
  "Ensure the data type matches the field requirements, such as Text, Number, Email, Phone, or File Upload.",
];

export const TicketTemplateNote: string[] = [
  "Enter a unique and descriptive Template Name to easily identify it later.",
  "Select the target audience for the ticket using the Internal, External, or Both options.",
  "Provide a clear Subject line that summarizes the purpose of the ticket template.",
  "Use the rich text editor in the Message section to format your main content.",
  "Utilize formatting tools like bold, italics, links, and lists to structure your message clearly.",
  "Ensure all mandatory fields marked with a red asterisk are completed before saving.",
];

export const ExceptionLevelNote: string[] = [
  "Enter a descriptive name identifying the circular type in the Level Name field.",
  "Specify the Internal Period duration strictly in minutes to define internal alerts.",
  "Define the External Period time frame in minutes for external notifications.",
  "Choose whether to calculate the alert interval based on Create Date or Update Date.",
  "Select the preferred communication channel under Alert Type, choosing from None, Mail, SMS, or Both.",
  "Ensure all mandatory fields marked with a red asterisk are correctly filled out.",
];

export const ExceptionMatrixNote: string[] = [
  "Select the required classification from the Level dropdown menu.",
  "Enter the contact information in the Mobile No field.",
  "Type an email address and press Enter to add it as a chip.",
  "Track the remaining email counter or click 'x' to remove added chips.",
];

export const UserAddNote: string[] = [
  "Fill out Username, User Role, and Department to configure profile details.",
  "Enter your First Name, Last Name, Mobile Number, and primary Email Id.",
  "Provide up to three alternate notification addresses in the Email Id 1, 2, and 3 fields.",
  "Ensure all fields marked with a red asterisk are completed before saving.",
];

// Purpose: System tooltips and operational notes for the Article workspace
// Created Date: 03-06-2026
export const ArticleConfiguNote: string[] = [
  "Specific articles require a validated category to inherit design styles.",
  "The rich-text editor automatically strips unsafe inline scripts.",
  "Targeting 'Both' publishes to internal lines and client dashboards.",
  "File attachment transmissions are strictly capped at 5 MB maximum.",
  "Private notes restrict screen lookup queries to supervisor access.",
  "Draft entries remain hidden from global search engine indexing.",
];

// Purpose: System tooltips and operational notes for the Announcement workspace
// Created Date: 03-06-2026
export const AnnouncementNote: string[] = [
  "Enabling 'Pop-up Alerts' forces a modal intercept on the targeted user's next active layout initialization.",
  "Selecting 'Email Alerts' queues an asynchronous background worker task to dispatch HTML notification templates.",
  "The publication validity duration defaults to active status until the midnight timestamp of the selected End Date.",
  "Rich-text description summaries preserve paragraph layout parameters while sanitizing embedded scripts.",
  "Uploaded validation reference materials are restricted to document extensions under a 5 MB file size scale.",
  "Archived or expired announcement logs remain accessible for audit queries within administrative tables.",
];
