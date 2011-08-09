/**
 * @properties={typeid:24,uuid:"679E98F4-990B-4543-9FDC-8A65A0047E7B"}
 */
function SNIPPET_states_us() {
	var html = '<option value="AL">Alabama</option>\n\
  	<option value="AK">Alaska</option>\n\
  	<option value="AZ">Arizona</option>\n\
	<option value="AR">Arkansas</option>\n\
	<option value="CA">California</option>\n\
	<option value="CO">Colorado</option>\n\
	<option value="CT">Connecticut</option>\n\
	<option value="DE">Delaware</option>\n\
	<option value="DC">Dist of Columbia</option>\n\
	<option value="FL">Florida</option>\n\
	<option value="GA">Georgia</option>\n\
	<option value="HI">Hawaii</option>\n\
	<option value="ID">Idaho</option>\n\
	<option value="IL">Illinois</option>\n\
	<option value="IN">Indiana</option>\n\
	<option value="IA">Iowa</option>\n\
	<option value="KS">Kansas</option>\n\
	<option value="KY">Kentucky</option>\n\
	<option value="LA">Louisiana</option>\n\
	<option value="ME">Maine</option>\n\
	<option value="MD">Maryland</option>\n\
	<option value="MA">Massachusetts</option>\n\
	<option value="MI">Michigan</option>\n\
	<option value="MN">Minnesota</option>\n\
	<option value="MS">Mississippi</option>\n\
	<option value="MO">Missouri</option>\n\
	<option value="MT">Montana</option>\n\
	<option value="NE">Nebraska</option>\n\
	<option value="NV">Nevada</option>\n\
	<option value="NH">New Hampshire</option>\n\
	<option value="NJ">New Jersey</option>\n\
	<option value="NM">New Mexico</option>\n\
	<option value="NY">New York</option>\n\
	<option value="NC">North Carolina</option>\n\
	<option value="ND">North Dakota</option>\n\
	<option value="OH">Ohio</option>\n\
	<option value="OK">Oklahoma</option>\n\
	<option value="OR">Oregon</option>\n\
	<option value="PA">Pennsylvania</option>\n\
	<option value="RI">Rhode Island</option>\n\
	<option value="SC">South Carolina</option>\n\
	<option value="SD">South Dakota</option>\n\
	<option value="TN">Tennessee</option>\n\
	<option value="TX">Texas</option>\n\
	<option value="UT">Utah</option>\n\
	<option value="VT">Vermont</option>\n\
	<option value="VA">Virginia</option>\n\
	<option value="WA">Washington</option>\n\
	<option value="WV">West Virginia</option>\n\
	<option value="WI">Wisconsin</option>\n\
	<option value="WY">Wyoming</option>\n'
		
	return html
}

/**
 * @properties={typeid:24,uuid:"B96A5D9D-B6CA-4785-B4EB-03BD34B11FD2"}
 */
function SNIPPET_credit_card_month() {
	var html = '<option value="01">1</option>\n\
  				<option value="02">2</option>\n\
  				<option value="03">3</option>\n\
				<option value="04">4</option>\n\
				<option value="05">5</option>\n\
				<option value="06">6</option>\n\
				<option value="07">7</option>\n\
				<option value="08">8</option>\n\
				<option value="09">9</option>\n\
				<option value="10">10</option>\n\
				<option value="11">11</option>\n\
				<option value="12">12</option>\n'
	return html
}

/**
 * @properties={typeid:24,uuid:"5AD0C261-20CA-4EAB-BDAD-BC675C223D1E"}
 */
function SNIPPET_credit_card_year() {
	var html =''
	var today = new Date()
	var thisYear = today.getFullYear()
	for (var i=thisYear; i<thisYear+11; i++) {
		html += '<option value="'+i+'">'+i+'</option>\n'
	}

	return html
}
