/**
 * @properties={type:12,typeid:36,uuid:"95CDA048-BF94-4D8A-BC39-8D267D5A35BE"}
 */
function display_user() {
	if (id_user) {
		return application.getValueListDisplayValue('AC_user_all_copy',id_user)
	}
	else {
		return 'Web User'
	}
}
