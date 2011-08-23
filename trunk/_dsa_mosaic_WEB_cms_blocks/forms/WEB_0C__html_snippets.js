/**
 * @properties={typeid:24,uuid:"679E98F4-990B-4543-9FDC-8A65A0047E7B"}
 */
function SNIPPET_states_us(selected) {
	
	function isSelected(state) {
		if (state == selected) {
			return ' selected="selected"'
		}
		else {
			return ''
		}
	}
	
	var html = '<option' + isSelected("AL") + ' value="AL">Alabama</option>\n\
  	<option' + isSelected("AK") + ' value="AK">Alaska</option>\n\
  	<option' + isSelected("AZ") + ' value="AZ">Arizona</option>\n\
	<option' + isSelected("AR") + ' value="AR">Arkansas</option>\n\
	<option' + isSelected("CA") + ' value="CA">California</option>\n\
	<option' + isSelected("CO") + ' value="CO">Colorado</option>\n\
	<option' + isSelected("CT") + ' value="CT">Connecticut</option>\n\
	<option' + isSelected("DE") + ' value="DE">Delaware</option>\n\
	<option' + isSelected("DC") + ' value="DC">Dist of Columbia</option>\n\
	<option' + isSelected("FL") + ' value="FL">Florida</option>\n\
	<option' + isSelected("GA") + ' value="GA">Georgia</option>\n\
	<option' + isSelected("HI") + ' value="HI">Hawaii</option>\n\
	<option' + isSelected("ID") + ' value="ID">Idaho</option>\n\
	<option' + isSelected("IL") + ' value="IL">Illinois</option>\n\
	<option' + isSelected("IN") + ' value="IN">Indiana</option>\n\
	<option' + isSelected("IA") + ' value="IA">Iowa</option>\n\
	<option' + isSelected("KS") + ' value="KS">Kansas</option>\n\
	<option' + isSelected("KY") + ' value="KY">Kentucky</option>\n\
	<option' + isSelected("LA") + ' value="LA">Louisiana</option>\n\
	<option' + isSelected("ME") + ' value="ME">Maine</option>\n\
	<option' + isSelected("MD") + ' value="MD">Maryland</option>\n\
	<option' + isSelected("MA") + ' value="MA">Massachusetts</option>\n\
	<option' + isSelected("MI") + ' value="MI">Michigan</option>\n\
	<option' + isSelected("MN") + ' value="MN">Minnesota</option>\n\
	<option' + isSelected("MS") + ' value="MS">Mississippi</option>\n\
	<option' + isSelected("MO") + ' value="MO">Missouri</option>\n\
	<option' + isSelected("MT") + ' value="MT">Montana</option>\n\
	<option' + isSelected("NE") + ' value="NE">Nebraska</option>\n\
	<option' + isSelected("NV") + ' value="NV">Nevada</option>\n\
	<option' + isSelected("NH") + ' value="NH">New Hampshire</option>\n\
	<option' + isSelected("NJ") + ' value="NJ">New Jersey</option>\n\
	<option' + isSelected("NM") + ' value="NM">New Mexico</option>\n\
	<option' + isSelected("NY") + ' value="NY">New York</option>\n\
	<option' + isSelected("NC") + ' value="NC">North Carolina</option>\n\
	<option' + isSelected("ND") + ' value="ND">North Dakota</option>\n\
	<option' + isSelected("OH") + ' value="OH">Ohio</option>\n\
	<option' + isSelected("OK") + ' value="OK">Oklahoma</option>\n\
	<option' + isSelected("OR") + ' value="OR">Oregon</option>\n\
	<option' + isSelected("PA") + ' value="PA">Pennsylvania</option>\n\
	<option' + isSelected("RI") + ' value="RI">Rhode Island</option>\n\
	<option' + isSelected("SC") + ' value="SC">South Carolina</option>\n\
	<option' + isSelected("SD") + ' value="SD">South Dakota</option>\n\
	<option' + isSelected("TN") + ' value="TN">Tennessee</option>\n\
	<option' + isSelected("TX") + ' value="TX">Texas</option>\n\
	<option' + isSelected("UT") + ' value="UT">Utah</option>\n\
	<option' + isSelected("VT") + ' value="VT">Vermont</option>\n\
	<option' + isSelected("VA") + ' value="VA">Virginia</option>\n\
	<option' + isSelected("WA") + ' value="WA">Washington</option>\n\
	<option' + isSelected("WV") + ' value="WV">West Virginia</option>\n\
	<option' + isSelected("WI") + ' value="WI">Wisconsin</option>\n\
	<option' + isSelected("WY") + ' value="WY">Wyoming</option>\n'
		
	return html
}

/**
 * @properties={typeid:24,uuid:"B96A5D9D-B6CA-4785-B4EB-03BD34B11FD2"}
 */
function SNIPPET_credit_card_month(selected) {
	
	function isSelected(month) {
		if (month == selected) {
			return ' selected="selected"'
		}
		else {
			return ''
		}
	}
	
	var html = '<option' + isSelected("01") + ' value="01">1</option>\n\
  				<option' + isSelected("02") + ' value="02">2</option>\n\
  				<option' + isSelected("03") + ' value="03">3</option>\n\
				<option' + isSelected("04") + ' value="04">4</option>\n\
				<option' + isSelected("05") + ' value="05">5</option>\n\
				<option' + isSelected("06") + ' value="06">6</option>\n\
				<option' + isSelected("07") + ' value="07">7</option>\n\
				<option' + isSelected("08") + ' value="08">8</option>\n\
				<option' + isSelected("09") + ' value="09">9</option>\n\
				<option' + isSelected("10") + ' value="10">10</option>\n\
				<option' + isSelected("11") + ' value="11">11</option>\n\
				<option' + isSelected("12") + ' value="12">12</option>\n'
	return html
}

/**
 * @properties={typeid:24,uuid:"5AD0C261-20CA-4EAB-BDAD-BC675C223D1E"}
 */
function SNIPPET_credit_card_year(selected) {
	var html =''
	var today = new Date()
	var thisYear = today.getFullYear()
	
	for (var i=thisYear; i<thisYear+11; i++) {
		if (utils.numberFormat(i,'####') == selected) {
			html += '<option selected="selected" value="'+i+'">'+i+'</option>\n'
		}
		else {
			html += '<option value="'+i+'">'+i+'</option>\n'
		}
	}

	return html
}
