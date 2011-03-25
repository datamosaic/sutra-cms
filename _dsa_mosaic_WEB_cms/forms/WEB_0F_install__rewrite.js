/**
 * @properties={typeid:24,uuid:"BC2B89EA-1253-4CDF-9430-11670FB3D100"}
 */
function TOGGLE_sample_rewrite(input) {
	if (typeof input != 'boolean') {
		input = (rewrite_enabled) ? true : false
	}
	
	elements.lbl_rewriteSample.visible = input
	elements.var_rewriteSample.visible = input
}
