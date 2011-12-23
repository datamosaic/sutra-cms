/**
 * @properties={type:12,typeid:36,uuid:"4DEA7AF3-07BD-41AD-A126-4683942414B1"}
 */
function display_asset_size()
{
	if (asset_size) {
		var size = asset_size / 1024
		
		if (size < 1) {
			return '<1 KB'
		}
		else if (size < 1024) {
			return utils.numberFormat(size,'#,###.#') + " KB"
		}
		else if (size > 1024 && size < (1024 * 1024)) {
			return utils.numberFormat(size/1024,'#,###.#') + ' MB'
		}
		else {
			return utils.numberFormat(size/(1024 * 1024),'#,###.#') + ' GB'
		}
	}
	else {
		return null
	}
}
