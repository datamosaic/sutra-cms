/**
 * @properties={type:12,typeid:36,uuid:"8B1ECF4B-BFAF-4E31-BFB1-798493D50F00"}
 */
function group_name() {
	if (utils.hasRecords(web_group_to_site_group)) {
		return web_group_to_site_group.group_name
	}
	else {
		return 'Group error'
	}
}
