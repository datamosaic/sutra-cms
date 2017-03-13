Coding a Block
==============

trello notes to integrate:

steps to convert up block  


1. major changes (anything with buttons, more than a few element property changes), extend the form with a ‘w’ at the end  
2. minor changes, set visibility on form how we need for webclient and then in load method, turn browser bean elements on if !webclient  
3. replace any property manipulation (visibility, editable, etc) with a call to globals.CMSb.propCheck