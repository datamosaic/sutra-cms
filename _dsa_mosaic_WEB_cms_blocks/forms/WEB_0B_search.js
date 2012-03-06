/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4FDACEED-6F16-46F7-827B-375E25824AD6"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * param {} obj Data object passed to all markup methods
 * @properties={typeid:24,uuid:"889FE03F-2A19-4773-B3D4-BA7D2D7BC15C"}
 * @AllowToRunInFind
 */
function VIEW_default(obj)
{
	// search markup
	var markup = 	'<form action="" method="get">' +
					'<input name="search_paths[]" type="hidden" value="">' +
					'<input name="query" type="text" value="">' +
					'<input name="submit" type="submit" value="my submit button">'
	// if search parameters, list them out				
	if ( obj.request.parameters.query ) {
		markup += '<div>'
		for (property in obj.request.parameters) {
			markup += property + ": " + obj.request.parameters[property] + '<br />'
		}
		markup += '</div>'
	}
								
	markup += 		'</form>'
	
	// return
	return markup
	
//	<?php  defined('C5_EXECUTE') or die(_("Access Denied.")); ?> 
//	<style>
//	#searchResults .pageLink{ font-size:12px; color:#999; margin:2px 0px 8px 0px; padding:0px; display:block }
//	#searchResults .searchResult{ margin-bottom:16px; margin-top:24px }
//	#searchResults .searchResult h3{ margin-bottom:0px; padding-bottom:0px }
//	#searchResults .searchResult p{margin-top:4px}
//	</style>
//	
//	<?php  if (isset($error)) { ?>
//		<?php echo $error?><br/><br/>
//	<?php  } ?>
//	
//	<form action="<?php echo $this->url( $resultTargetURL )?>" method="get">
//	
//	<?php  if( strlen($title)>0){ ?><h3><?php echo $title?></h3><?php  } ?>
//	
//	<?php  if(strlen($query)==0){ ?>
//	<input name="search_paths[]" type="hidden" value="<?php echo $baseSearchPath?>" />
//	<?php  } else if (is_array($_REQUEST['search_paths'])) { 
//		foreach($_REQUEST['search_paths'] as $search_path){ ?>
//			<input name="search_paths[]" type="hidden" value="<?php echo $search_path?>" />
//	<?php   }
//	} ?>
//	
//	<input name="query" type="text" value="<?php echo $query?>" />
//	
//	<input name="submit" type="submit" value="<?php echo $buttonText?>" />
//	
//	<?php  
//	$tt = Loader::helper('text');
//	if (strlen($query)) { 
//		if(count($results)==0){ ?>
//			<h4 style="margin-top:32px"><?php echo t('There were no results found. Please try another keyword or phrase.')?></h4>	
//	<?php  }else{ ?>
//		<div id="searchResults">
//		<?php  foreach($results as $r) { 
//			$currentPageBody = $this->controller->highlightedExtendedMarkup($r->getBodyContent(), $query);?>
//			<div class="searchResult">
//				<h3><a href="<?php echo DIR_REL?>/index.php?cID=<?php echo $r->getID()?>"><?php echo $r->getName()?></a></h3>
//				<p>
//					<?php  echo ($currentPageBody ? $currentPageBody .'<br />' : '')?>
//					<?php  echo $this->controller->highlightedMarkup($tt->shortText($r->getDescription()),$query)?>
//					<span class="pageLink"><?php  echo $this->controller->highlightedMarkup(BASE_URL.DIR_REL.$r->getCollectionPath(),$query)?></span>
//				</p>
//			</div>
//		<?php  	}//foreach search result ?>
//		</div>
//		
//		<?php 
//		if($paginator && strlen($paginator->getPages())>0){ ?>	
//		<div class="pagination">	
//			 <span class="pageLeft"><?php echo $paginator->getPrevious()?></span>
//			 <span class="pageRight"><?php echo $paginator->getNext()?></span>
//			 <?php echo $paginator->getPages()?>
//		</div>	
//		<?php  } ?>
//	
//	<?php 				
//	} //results found
//	} 
//	?>
//	
//	</form>
	
	
}

/**
 *
 * @properties={typeid:24,uuid:"ADA57FA5-8536-4365-A091-D72F2EF80A8E"}
 */
function SCHEMA_search() {
	return { 	label_title			: text,
				label_button		: text,
				result_flag			: integer,
				result_id			: integer,
				search_path_flag	: integer,
				search_path_id		: integer
			}
}
