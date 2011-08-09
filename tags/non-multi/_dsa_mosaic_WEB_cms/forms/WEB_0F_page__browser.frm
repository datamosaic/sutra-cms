dataSource:"db:/sutra_cms/web_page",
items:[
{
beanClassName:"net.stuff.servoy.browser.beans.ServoyBrowser",
beanXML:"<?xml version=\"1.0\" encoding=\"UTF-8\"?> 
<java version=\"1.5.0_19\" class=\"java.beans.XMLDecoder\"> 
 <object class=\"net.stuff.servoy.browser.beans.ServoyBrowser\"> 
  <void property=\"allowDownloads\"> 
   <boolean>false<\/boolean> 
  <\/void> 
  <void property=\"borderType\"> 
   <object class=\"javax.swing.border.EmptyBorder\"> 
     <int>0<\/int> 
     <int>0<\/int> 
     <int>0<\/int> 
     <int>0<\/int> 
    <\/object> 
  <\/void> 
  <void property=\"buttonBarVisible\"> 
   <boolean>false<\/boolean> 
  <\/void> 
  <void property=\"confirmCancelDownload\"> 
   <boolean>false<\/boolean> 
  <\/void> 
  <void property=\"dataProviderIsURL\"> 
   <boolean>false<\/boolean> 
  <\/void> 
  <void property=\"downloadManagerVisible\"> 
   <boolean>false<\/boolean> 
  <\/void> 
  <void property=\"enablePopup\"> 
   <boolean>false<\/boolean> 
  <\/void> 
  <void property=\"locationBarVisible\"> 
   <boolean>false<\/boolean> 
  <\/void> 
  <void property=\"menuBarVisible\"> 
   <boolean>false<\/boolean> 
  <\/void> 
  <void property=\"trapStatusMessages\"> 
   <boolean>false<\/boolean> 
  <\/void> 
 <\/object> 
<\/java> 
",
location:"0,0",
name:"bn_browser",
size:"300,70",
typeid:12,
uuid:"114B4BAA-6D14-43A6-BB3D-3C74FDD5305E"
},
{
height:200,
partType:5,
typeid:19,
uuid:"2873230D-E47A-466D-BEE8-AF849A309A42"
},
{
anchors:15,
beanClassName:"javax.swing.JSplitPane",
beanXML:"<?xml version=\"1.0\" encoding=\"UTF-8\"?> 
<java version=\"1.5.0_19\" class=\"java.beans.XMLDecoder\"> 
 <object class=\"javax.swing.JSplitPane\"> 
  <int>0<\/int> 
  <void property=\"size\"> 
   <object class=\"java.awt.Dimension\"> 
    <int>300<\/int> 
    <int>200<\/int> 
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
   <string>bean_split<\/string> 
  <\/void> 
  <void property=\"oneTouchExpandable\"> 
   <boolean>true<\/boolean> 
  <\/void> 
  <void property=\"opaque\"> 
   <boolean>false<\/boolean> 
  <\/void> 
  <void property=\"requestFocusEnabled\"> 
   <boolean>false<\/boolean> 
  <\/void> 
 <\/object> 
<\/java> 
",
formIndex:-1,
location:"0,0",
name:"bean_split",
size:"300,200",
typeid:12,
usesUI:true,
uuid:"5C391269-00C0-4B8F-996A-B983EA27A294"
},
{
anchors:15,
items:[
{
containsFormID:"5870F778-8D64-4E47-9C13-748A0B07ACB7",
location:"100,160",
text:"WEB_0F_page__browser__editor",
typeid:15,
uuid:"99E836F8-784A-4F89-8A96-0B35A172A33D"
}
],
location:"100,150",
name:"tab_editor",
printable:false,
size:"100,50",
tabOrientation:-1,
transparent:true,
typeid:16,
uuid:"72A0BC31-462D-4BF4-9F93-77ED1EC7C315"
}
],
name:"WEB_0F_page__browser",
navigatorID:"-1",
onLoadMethodID:"341E923E-40EF-4E1D-9C25-802AC05D4789",
onRecordSelectionMethodID:"60C0F66F-9740-428F-8C64-BE5870650741",
onShowMethodID:"054DD2AE-9EC2-4214-AF1C-5612B58E4E77",
paperPrintScale:100,
size:"300,200",
styleClass:"workarea1",
styleName:"_DATASUTRA_",
typeid:3,
uuid:"BA10ECBB-1976-4594-90C4-BEE54C45632A"