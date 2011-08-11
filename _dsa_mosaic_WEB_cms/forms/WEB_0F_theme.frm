dataSource:"db:/sutra_cms/web_theme",
initialSort:"theme_name asc",
items:[
{
height:16,
partType:1,
typeid:19,
uuid:"12ECD7CB-523F-463A-A6D5-26EE3A8586A1"
},
{
anchors:11,
background:"#d1d7e2",
borderType:"MatteBorder,0,1,0,0,#A1B0CF",
formIndex:10502,
items:[
{
containsFormID:"88829481-86F5-4832-89BC-437A19F9EF71",
location:"440,250",
relationName:"web_theme_to_layout.web_layout_to_editable",
text:"WEB_0F_theme_1L_editable",
typeid:15,
uuid:"D086AAF1-9919-409C-B6BB-C4E765B95494"
}
],
location:"440,230",
name:"tab_editable",
printable:false,
size:"100,100",
tabOrientation:-1,
typeid:16,
uuid:"14378C46-02FD-431F-AA28-00978E0EF7D7"
},
{
anchors:15,
formIndex:9997,
location:"10,189",
name:"tab_fake",
printable:false,
size:"760,184",
styleClass:"grid_primary",
tabOrientation:-1,
typeid:16,
uuid:"211789C9-B4A8-4878-8B8D-7FA5A6131801"
},
{
anchors:15,
beanClassName:"javax.swing.JSplitPane",
beanXML:"<?xml version=\"1.0\" encoding=\"UTF-8\"?> 
<java version=\"1.6.0_22\" class=\"java.beans.XMLDecoder\"> 
 <object class=\"javax.swing.JSplitPane\"> 
  <int>1<\/int> 
  <void property=\"background\"> 
   <object class=\"java.awt.Color\"> 
    <int>209<\/int> 
    <int>215<\/int> 
    <int>226<\/int> 
    <int>255<\/int> 
   <\/object> 
  <\/void> 
  <void property=\"size\"> 
   <object class=\"java.awt.Dimension\"> 
    <int>170<\/int> 
    <int>90<\/int> 
   <\/object> 
  <\/void> 
  <void property=\"UI\"> 
   <void property=\"continuousLayout\"> 
    <boolean>true<\/boolean> 
   <\/void> 
  <\/void> 
  <void property=\"border\"> 
   <null/> 
  <\/void> 
  <void property=\"continuousLayout\"> 
   <boolean>true<\/boolean> 
  <\/void> 
  <void property=\"dividerLocation\"> 
   <int>0<\/int> 
  <\/void> 
  <void property=\"dividerSize\"> 
   <int>0<\/int> 
  <\/void> 
  <void property=\"focusable\"> 
   <boolean>false<\/boolean> 
  <\/void> 
  <void property=\"lastDividerLocation\"> 
   <int>0<\/int> 
  <\/void> 
  <void property=\"name\"> 
   <string>bean_split_2<\/string> 
  <\/void> 
  <void property=\"opaque\"> 
   <boolean>false<\/boolean> 
  <\/void> 
  <void property=\"resizeWeight\"> 
   <double>0.5<\/double> 
  <\/void> 
 <\/object> 
<\/java> 
",
formIndex:9999,
location:"40,220",
name:"bean_split_2",
size:"170,90",
typeid:12,
usesUI:true,
uuid:"388951F2-E6E0-4B12-8FFC-FE0BD2C20127"
},
{
anchors:11,
displaysTags:true,
formIndex:11000,
location:"15,0",
mediaOptions:14,
showClick:false,
showFocus:false,
size:"750,15",
styleClass:"header",
tabSeq:-1,
text:"THEMES",
transparent:true,
typeid:7,
uuid:"4B15062C-5D60-4BB8-87B1-54FC58394328"
},
{
anchors:11,
background:"#d1d7e2",
borderType:"MatteBorder,0,0,0,0,#A1B0CF",
formIndex:10502,
items:[
{
containsFormID:"80CBD273-902F-47A8-9E61-F956D26EF9E9",
location:"560,260",
relationName:"web_theme_to_layout.web_layout_to_editable.web_editable_to_editable_default",
text:"WEB_0F_theme_1L_editable_default",
typeid:15,
uuid:"7413E68A-7293-4352-A4B7-618FFF9A1AD9"
}
],
location:"560,230",
name:"tab_editable_default",
printable:false,
size:"100,100",
tabOrientation:-1,
typeid:16,
uuid:"59362627-3371-4DC1-8CC5-9CAB1A7A2B88"
},
{
formIndex:11900,
horizontalAlignment:0,
imageMediaID:"a2e147c1-5027-45cb-abf0-ddf2d8588969",
location:"531,40",
mediaOptions:1,
name:"help_contact_details",
onActionMethodID:"6a193823-8789-4ec3-a7bf-45d1238dc5bd",
rolloverCursor:12,
rolloverImageMediaID:"887d1bba-05d3-429c-9789-113b96279683",
showClick:false,
showFocus:false,
size:"20,16",
tabSeq:-2,
transparent:true,
typeid:7,
uuid:"5A6978EA-EA2D-4BB3-A61E-4257E607DE45"
},
{
anchors:11,
formIndex:10000,
location:"560,58",
mediaOptions:14,
showClick:false,
showFocus:false,
size:"210,92",
styleClass:"color_light",
tabSeq:-1,
typeid:7,
uuid:"6EA59864-724E-42BE-A669-B2D2CD14270D"
},
{
formIndex:10400,
location:"111,80",
mediaOptions:14,
showClick:false,
showFocus:false,
size:"120,23",
styleClass:"standard_table_bottom",
tabSeq:-1,
text:"/sites/xxx/themes/",
transparent:true,
typeid:7,
uuid:"7045FB85-7406-4897-8EC4-D65B76EDDA0D"
},
{
anchors:11,
borderType:"EmptyBorder,0,0,0,0",
dataProviderID:"description",
displayType:1,
formIndex:12700,
location:"560,58",
scrollbars:33,
size:"210,93",
styleClass:"standard_table_textarea",
transparent:true,
typeid:4,
uuid:"82471B11-BC58-476E-AF43-E58DA32B8858"
},
{
height:380,
partType:5,
typeid:19,
uuid:"83DAA8FA-6F8C-4E36-8688-7EA67B012B75"
},
{
dataProviderID:"theme_directory",
formIndex:10500,
location:"110,81",
margin:"0,120,0,0",
onFocusLostMethodID:"E1AF70C2-4087-41C1-A588-5F413DD0FD5A",
scrollbars:36,
size:"440,23",
styleClass:"standard_table",
tabSeq:2,
transparent:true,
typeid:4,
uuid:"8F4EFCC7-6D95-40C1-8C10-0571DB618FCC"
},
{
anchors:11,
formIndex:11800,
location:"250,172",
mediaOptions:14,
name:"lbl_slide_2",
showClick:false,
showFocus:false,
size:"210,18",
styleClass:"standard_table_category",
tabSeq:-1,
text:"Editable areas",
transparent:true,
typeid:7,
uuid:"8FD137BF-9090-40AD-9EC4-55B4FD0A564E"
},
{
anchors:3,
formIndex:12900,
horizontalAlignment:0,
imageMediaID:"ca71eeeb-624d-461d-a4b3-41a387f1304a",
location:"749,174",
mediaOptions:14,
name:"btn_add",
onActionMethodID:"D7D1CE91-8C52-4808-BE77-DA406B1D8B8B",
rolloverCursor:12,
rolloverImageMediaID:"e5ed6909-0205-4660-b805-94edf9739179",
showClick:false,
showFocus:false,
size:"20,15",
transparent:true,
typeid:7,
uuid:"90B0D063-D201-49DC-8A43-05E686A5FF3D"
},
{
formIndex:10700,
location:"40,58",
mediaOptions:14,
showClick:false,
showFocus:false,
size:"70,23",
styleClass:"standard_table",
tabSeq:-1,
text:"Theme",
transparent:true,
typeid:7,
uuid:"A28E2F00-E8DD-4280-8614-A7F843801C93"
},
{
anchors:11,
beanClassName:"javax.swing.JSplitPane",
beanXML:"<?xml version=\"1.0\" encoding=\"UTF-8\"?> 
<java version=\"1.6.0_22\" class=\"java.beans.XMLDecoder\"> 
 <object class=\"javax.swing.JSplitPane\"> 
  <int>1<\/int> 
  <void property=\"background\"> 
   <object class=\"java.awt.Color\"> 
    <int>209<\/int> 
    <int>215<\/int> 
    <int>226<\/int> 
    <int>255<\/int> 
   <\/object> 
  <\/void> 
  <void property=\"size\"> 
   <object class=\"java.awt.Dimension\"> 
    <int>170<\/int> 
    <int>90<\/int> 
   <\/object> 
  <\/void> 
  <void property=\"UI\"> 
   <void property=\"continuousLayout\"> 
    <boolean>true<\/boolean> 
   <\/void> 
  <\/void> 
  <void property=\"border\"> 
   <null/> 
  <\/void> 
  <void property=\"continuousLayout\"> 
   <boolean>true<\/boolean> 
  <\/void> 
  <void property=\"dividerLocation\"> 
   <int>0<\/int> 
  <\/void> 
  <void property=\"dividerSize\"> 
   <int>0<\/int> 
  <\/void> 
  <void property=\"focusable\"> 
   <boolean>false<\/boolean> 
  <\/void> 
  <void property=\"lastDividerLocation\"> 
   <int>0<\/int> 
  <\/void> 
  <void property=\"name\"> 
   <string>bean_split_2<\/string> 
  <\/void> 
  <void property=\"opaque\"> 
   <boolean>false<\/boolean> 
  <\/void> 
  <void property=\"resizeWeight\"> 
   <double>0.5<\/double> 
  <\/void> 
 <\/object> 
<\/java> 
",
formIndex:9999,
location:"99,172",
name:"bean_split_4",
size:"170,18",
typeid:12,
usesUI:true,
uuid:"A91DF0DA-9758-4733-B1B2-3D7A2FACC88C"
},
{
anchors:11,
formIndex:11500,
location:"560,40",
mediaOptions:14,
showClick:false,
showFocus:false,
size:"210,18",
styleClass:"standard_table",
tabSeq:-1,
text:"Description",
transparent:true,
typeid:7,
uuid:"B538475D-6A93-41F8-8060-DCC6B3ADB0D3"
},
{
anchors:11,
formIndex:10900,
imageMediaID:"50b57e9b-b95e-4188-bcfb-1f0f0936643d",
location:"0,0",
mediaOptions:6,
showClick:false,
showFocus:false,
size:"780,16",
tabSeq:-1,
typeid:7,
uuid:"CBA8C3DE-ECFD-422E-85C6-6A407D9DDF4E"
},
{
anchors:11,
formIndex:11800,
location:"470,172",
mediaOptions:14,
name:"lbl_slide_3",
showClick:false,
showFocus:false,
size:"300,18",
styleClass:"standard_table_category",
tabSeq:-1,
text:"Default blocks",
transparent:true,
typeid:7,
uuid:"D47CDC6B-9FD5-4D59-A64A-1A8D3B722B82"
},
{
dataProviderID:"theme_name",
formIndex:10600,
location:"110,58",
name:"fld_theme_name",
scrollbars:36,
size:"440,23",
styleClass:"standard_table",
tabSeq:1,
transparent:true,
typeid:4,
uuid:"D4E98555-BDA8-4D3E-BC76-DD77EDC402EF"
},
{
anchors:15,
beanClassName:"javax.swing.JSplitPane",
beanXML:"<?xml version=\"1.0\" encoding=\"UTF-8\"?> 
<java version=\"1.6.0_22\" class=\"java.beans.XMLDecoder\"> 
 <object class=\"javax.swing.JSplitPane\"> 
  <int>1<\/int> 
  <void property=\"background\"> 
   <object class=\"java.awt.Color\"> 
    <int>209<\/int> 
    <int>215<\/int> 
    <int>226<\/int> 
    <int>255<\/int> 
   <\/object> 
  <\/void> 
  <void property=\"size\"> 
   <object class=\"java.awt.Dimension\"> 
    <int>760<\/int> 
    <int>190<\/int> 
   <\/object> 
  <\/void> 
  <void property=\"UI\"> 
   <void property=\"continuousLayout\"> 
    <boolean>true<\/boolean> 
   <\/void> 
  <\/void> 
  <void property=\"border\"> 
   <null/> 
  <\/void> 
  <void property=\"continuousLayout\"> 
   <boolean>true<\/boolean> 
  <\/void> 
  <void property=\"dividerLocation\"> 
   <int>0<\/int> 
  <\/void> 
  <void property=\"dividerSize\"> 
   <int>0<\/int> 
  <\/void> 
  <void property=\"focusable\"> 
   <boolean>false<\/boolean> 
  <\/void> 
  <void property=\"lastDividerLocation\"> 
   <int>0<\/int> 
  <\/void> 
  <void property=\"name\"> 
   <string>bean_split_1<\/string> 
  <\/void> 
  <void property=\"opaque\"> 
   <boolean>false<\/boolean> 
  <\/void> 
  <void property=\"resizeWeight\"> 
   <double>0.5<\/double> 
  <\/void> 
 <\/object> 
<\/java> 
",
formIndex:9998,
location:"11,190",
name:"bean_split_1",
size:"758,180",
typeid:12,
usesUI:true,
uuid:"D7F05C88-0D98-4DEC-9187-8CDACFF23D43"
},
{
anchors:11,
formIndex:11800,
location:"30,172",
mediaOptions:14,
name:"lbl_slide_1",
showClick:false,
showFocus:false,
size:"190,18",
styleClass:"standard_table_category",
tabSeq:-1,
text:"Layouts",
transparent:true,
typeid:7,
uuid:"DA2C5E10-1332-4298-A940-DA1C763790DB"
},
{
formIndex:11800,
location:"10,40",
mediaOptions:14,
showClick:false,
showFocus:false,
size:"540,18",
styleClass:"standard_table_category",
tabSeq:-1,
text:"Details",
transparent:true,
typeid:7,
uuid:"E25D85E3-CA8B-47EA-9F08-3B30076691BC"
},
{
formIndex:10400,
location:"40,81",
mediaOptions:14,
showClick:false,
showFocus:false,
size:"70,23",
styleClass:"standard_table",
tabSeq:-1,
text:"Directory",
transparent:true,
typeid:7,
uuid:"E53B4E4B-EA53-4D31-8251-56EAC9C6AA3C"
},
{
anchors:11,
beanClassName:"javax.swing.JSplitPane",
beanXML:"<?xml version=\"1.0\" encoding=\"UTF-8\"?> 
<java version=\"1.6.0_22\" class=\"java.beans.XMLDecoder\"> 
 <object class=\"javax.swing.JSplitPane\"> 
  <int>1<\/int> 
  <void property=\"background\"> 
   <object class=\"java.awt.Color\"> 
    <int>209<\/int> 
    <int>215<\/int> 
    <int>226<\/int> 
    <int>255<\/int> 
   <\/object> 
  <\/void> 
  <void property=\"size\"> 
   <object class=\"java.awt.Dimension\"> 
    <int>760<\/int> 
    <int>190<\/int> 
   <\/object> 
  <\/void> 
  <void property=\"UI\"> 
   <void property=\"continuousLayout\"> 
    <boolean>true<\/boolean> 
   <\/void> 
  <\/void> 
  <void property=\"border\"> 
   <null/> 
  <\/void> 
  <void property=\"continuousLayout\"> 
   <boolean>true<\/boolean> 
  <\/void> 
  <void property=\"dividerLocation\"> 
   <int>0<\/int> 
  <\/void> 
  <void property=\"dividerSize\"> 
   <int>0<\/int> 
  <\/void> 
  <void property=\"focusable\"> 
   <boolean>false<\/boolean> 
  <\/void> 
  <void property=\"lastDividerLocation\"> 
   <int>0<\/int> 
  <\/void> 
  <void property=\"name\"> 
   <string>bean_split_1<\/string> 
  <\/void> 
  <void property=\"opaque\"> 
   <boolean>false<\/boolean> 
  <\/void> 
  <void property=\"resizeWeight\"> 
   <double>0.5<\/double> 
  <\/void> 
 <\/object> 
<\/java> 
",
formIndex:9998,
location:"10,172",
name:"bean_split_3",
size:"758,18",
typeid:12,
usesUI:true,
uuid:"E7BC986A-E386-4565-9CB8-4C4E50688C33"
},
{
anchors:11,
background:"#d1d7e2",
borderType:"MatteBorder,0,1,0,0,#A1B0CF",
formIndex:10502,
items:[
{
containsFormID:"B06F18D2-47EB-43CE-A8F2-58472E93951A",
location:"320,240",
relationName:"web_theme_to_layout",
text:"WEB_0F_theme_1L_layout",
typeid:15,
uuid:"EF16BAAA-5527-43FF-88DD-5C05B95F2D60"
}
],
location:"320,230",
name:"tab_layout",
printable:false,
size:"100,100",
tabOrientation:-1,
typeid:16,
uuid:"F230D07C-8544-4955-B0C4-2C8A60EE4F62"
}
],
name:"WEB_0F_theme",
navigatorID:"-1",
onHideMethodID:"C8199313-FD5E-49CD-BC36-6971DF267DAF",
onLoadMethodID:"7EC1827E-0F69-47EB-B222-2971B81C2728",
onRecordEditStopMethodID:"-1",
onRecordSelectionMethodID:"-1",
onShowMethodID:"6A6517C7-831B-4579-A192-2ED134AEBB4C",
paperPrintScale:100,
size:"780,380",
styleName:"_DATASUTRA_",
typeid:3,
uuid:"65FE01C0-6291-4562-93D8-F3C067D3F9A5"