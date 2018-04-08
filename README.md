# The Clinico-Genomics Dashboard

## About

This is an extension of the SMART Cancer Navigator.  More extensive description TBD.  

## Development Testing Instructions 

1. Create a new account on the [HSPC sandbox](sandbox.hspconsortium.org).  
2. Create a new sandbox from your HSPC account.  
3. Navigate to the Registered Apps tab on the left side of the page, and click 'register a new app manually'.  
4. Register the app values as launch: http://127.0.0.1:4200/smart-launch, and redirect uri(s): http://127.0.0.1:4200/token-reception
5. Create a new persona with the default practitioner (John Smith).  
6. Create a new launch scenario with a random patient and this new persona.  Link it to this newly registered app.  
7. ```cd``` to the cloned repository on your local machine and run ```ng serve```.  
8. Launch your app by either navigating to [localhost:4200](http://localhost:4200), which provides no SMART context, or via the HSPC sandbox and launch it using your new launch scenario.  

