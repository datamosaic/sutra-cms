dataSource:"db:/sutra_cms/web_page",
items:[
{
anchors:11,
borderType:"MatteBorder,0,0,1,0,#647b95",
displaysTags:true,
foreground:"#335387",
formIndex:9998,
horizontalAlignment:2,
location:"10,0",
margin:"0,5,0,0",
mediaOptions:14,
name:"lbl_display",
onActionMethodID:"-1",
showClick:false,
showFocus:false,
size:"580,25",
styleClass:"heading1",
text:"%%display_page_name%%",
transparent:true,
typeid:7,
uuid:"11BDA1DC-46E2-4041-8A59-847BDB244934"
},
{
anchors:11,
displaysTags:true,
foreground:"#335387",
formIndex:10300,
horizontalAlignment:4,
location:"235,166",
mediaOptions:14,
onActionMethodID:"-1",
showClick:false,
showFocus:false,
size:"350,16",
styleClass:"heading3",
text:"Site: %%web_page_to_site.site_name%%",
transparent:true,
typeid:7,
uuid:"2C40A1DF-D024-48E7-9A0F-140E2ED9070B"
},
{
anchors:11,
formIndex:8,
items:[
{
containsFormID:"E547F6F6-7034-4915-ADAE-3C5A87D12E0B",
location:"500,36",
text:"WEB_0F_page__design_1F__header_display__version",
typeid:15,
uuid:"A03E6766-2AAE-4613-9571-06A4C4FC9C2D"
}
],
location:"500,26",
name:"tab_version",
printable:false,
size:"94,18",
tabOrientation:-1,
transparent:true,
typeid:16,
uuid:"4CDEE23D-5619-4ADE-899A-4A157E85CADC"
},
{
anchors:11,
displaysTags:true,
foreground:"#335387",
formIndex:9997,
horizontalAlignment:4,
location:"235,180",
mediaOptions:14,
onActionMethodID:"-1",
showClick:false,
showFocus:false,
size:"350,16",
styleClass:"heading3",
text:"%%display_header_sub_right%%",
transparent:true,
typeid:7,
uuid:"4DAEB934-1726-4FCD-9C72-E90CD32F6630"
},
{
anchors:11,
beanClassName:"javax.swing.JSplitPane",
beanXML:"<?xml version=\"1.0\" encoding=\"UTF-8\"?> 
<java version=\"1.6.0_26\" class=\"java.beans.XMLDecoder\"> 
 <object class=\"javax.swing.JSplitPane\"> 
  <int>1<\/int> 
  <void property=\"size\"> 
   <object class=\"java.awt.Dimension\"> 
    <int>580<\/int> 
    <int>19<\/int> 
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
   <string>split_picker_1<\/string> 
  <\/void> 
  <void property=\"opaque\"> 
   <boolean>false<\/boolean> 
  <\/void> 
  <void property=\"resizeWeight\"> 
   <double>0.3<\/double> 
  <\/void> 
 <\/object> 
<\/java> 
",
location:"10,25",
name:"split_picker_1",
size:"580,19",
typeid:12,
usesUI:true,
uuid:"5D6BFBFD-56F5-4BE1-913D-309D0888434B"
},
{
formIndex:7,
items:[
{
containsFormID:"55151C84-0875-48B4-8A15-33DAB93D78E2",
location:"346,36",
relationName:"web_page_to_group",
text:"WEB_0F_page__design_1F__header_display_2F_group",
typeid:15,
uuid:"54B95DF4-BEAB-4D2B-94FA-DBD6173169D6"
}
],
location:"346,26",
name:"tab_group",
printable:false,
size:"154,18",
tabOrientation:-1,
transparent:true,
typeid:16,
uuid:"61F4C783-9C26-4058-96B5-AC1E7FE423D0"
},
{
formIndex:5,
items:[
{
containsFormID:"DFCD7678-F809-406E-93DE-4857E24FD46F",
location:"30,36",
relationName:"web_page_to_platform",
text:"WEB_0F_page__design_1F__header_display_2F_platform",
typeid:15,
uuid:"86E77198-D88E-4752-A64D-AB60F47632B4"
}
],
location:"10,26",
name:"tab_platform",
printable:false,
size:"174,18",
tabOrientation:-1,
transparent:true,
typeid:16,
uuid:"88A1737A-9A28-4752-B2FD-1006F5F024EB"
},
{
anchors:11,
beanClassName:"javax.swing.JSplitPane",
beanXML:"<?xml version=\"1.0\" encoding=\"UTF-8\"?> 
<java version=\"1.6.0_26\" class=\"java.beans.XMLDecoder\"> 
 <object class=\"javax.swing.JSplitPane\"> 
  <int>1<\/int> 
  <void property=\"size\"> 
   <object class=\"java.awt.Dimension\"> 
    <int>150<\/int> 
    <int>19<\/int> 
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
   <string>split_picker_3<\/string> 
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
formIndex:1,
location:"280,25",
name:"split_picker_3",
size:"150,19",
typeid:12,
usesUI:true,
uuid:"8DE481AD-16A6-4166-9D2E-0D4909C41019"
},
{
formIndex:6,
items:[
{
containsFormID:"971CD761-A277-48CA-A541-B85A175FF736",
location:"180,36",
relationName:"web_page_to_language",
text:"WEB_0F_page__design_1F__header_display_2F_language",
typeid:15,
uuid:"7818964E-7027-46A9-B15B-47B1EC7F70B2"
}
],
location:"180,26",
name:"tab_language",
printable:false,
size:"164,18",
tabOrientation:-1,
transparent:true,
typeid:16,
uuid:"8E8A67C5-A518-4DB6-8C35-C99E25D68F58"
},
{
anchors:15,
formIndex:4,
horizontalAlignment:2,
location:"10,26",
mediaOptions:14,
name:"lbl_folder",
onActionMethodID:"FA57171D-D36D-4182-9DDB-DEBD402A71C1",
showClick:false,
showFocus:false,
size:"580,18",
styleClass:"color_white",
typeid:7,
uuid:"9A12BB9D-1C8F-4972-B2B2-18101B7F354C"
},
{
anchors:11,
displaysTags:true,
formIndex:10200,
horizontalAlignment:4,
location:"235,6",
mediaOptions:14,
showClick:false,
showFocus:false,
size:"350,16",
styleClass:"grid_pri_tab_select",
tabSeq:-1,
text:"%%globals.WEB_site_display%%   ID: %%url_param%%",
transparent:true,
typeid:7,
uuid:"BDF22638-F531-44BC-B35C-DA717F9F8749"
},
{
height:44,
partType:5,
typeid:19,
uuid:"C8CBB406-83D2-4A3B-B152-98DEF47ADBD3"
},
{
anchors:11,
beanClassName:"javax.swing.JSplitPane",
beanXML:"<?xml version=\"1.0\" encoding=\"UTF-8\"?> 
<java version=\"1.6.0_26\" class=\"java.beans.XMLDecoder\"> 
 <object class=\"javax.swing.JSplitPane\"> 
  <int>1<\/int> 
  <void property=\"size\"> 
   <object class=\"java.awt.Dimension\"> 
    <int>150<\/int> 
    <int>19<\/int> 
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
   <string>split_picker_2<\/string> 
  <\/void> 
  <void property=\"opaque\"> 
   <boolean>false<\/boolean> 
  <\/void> 
  <void property=\"resizeWeight\"> 
   <double>0.33<\/double> 
  <\/void> 
 <\/object> 
<\/java> 
",
formIndex:2,
location:"100,25",
name:"split_picker_2",
size:"150,19",
typeid:12,
usesUI:true,
uuid:"CF82B8EC-A961-4E5C-A5FD-4D89FC7A7D20"
},
{
anchors:15,
formIndex:3,
horizontalAlignment:2,
location:"10,26",
mediaOptions:14,
name:"lbl_link",
onActionMethodID:"FA57171D-D36D-4182-9DDB-DEBD402A71C1",
rolloverCursor:12,
showClick:false,
showFocus:false,
size:"580,18",
styleClass:"color_white",
typeid:7,
uuid:"D6823668-0EF8-4A33-B1AA-FD4200A4FB45"
}
],
name:"WEB_0F_page__design_1F__header_display",
navigatorID:"-1",
onLoadMethodID:"8F3EE159-96AD-4FC8-A978-BD2ABAD1F366",
onRecordSelectionMethodID:"-1",
onShowMethodID:"EDA657C6-3547-40F8-956C-5E8541E4930C",
paperPrintScale:100,
size:"600,44",
styleName:"_DATASUTRA_",
typeid:3,
uuid:"AF305FBE-058C-4407-9B8E-A74CDA373875"