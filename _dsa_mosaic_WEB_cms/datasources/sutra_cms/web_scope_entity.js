
/**
 * Called before the form component is rendered.
 *
 * @param {JSRenderEvent} event the render event
 *
 * @properties={typeid:24,uuid:"87186441-8B04-4BCD-A9FA-84EB2602F8FB"}
 */
function row_render(event) {
	if (event instanceof JSRenderEvent) {
		/** @type {JSRecord<db:/sutra_cms/web_scope>} */
		var record = event.getRecord()
		var renderable = event.getRenderable()
			
		if (record instanceof JSRecord) {
			var scrapbook = utils.hasRecords(record.web_scope_to_block) && record.web_scope_to_block.scope_type
			var layout = utils.hasRecords(record.web_scope_to_block) && utils.hasRecords(record.web_scope_to_block.web_block_to_block_display) && record.web_scope_to_block.web_block_to_block_display.flag_layout
			
			//white/tan with medium blue highlighter and green if a scrapbook
			if (event.isRecordSelected()) {
				//layout formatter
				if (layout) {
					renderable.bgcolor = '#E6B6B6'
				}
				//there are blocks and they aren't unique
				else if (scrapbook) {
					renderable.bgcolor =  '#B6E6B6'
				}
				else {
					renderable.bgcolor = '#BED7F7'
				}
			}
			else {
				//layout formatter
				if (layout) {
					renderable.bgcolor = '#F5DBDB'
				}
				//scrapbook
				else if (scrapbook) {
					renderable.bgcolor =  '#DBF5DB'
				}
				//normal row alternation
				else {
					if (event.getRecordIndex() % 2 == 0) {
						renderable.bgcolor = '#FBFBFB'
					}
					else {
						renderable.bgcolor = '#FFFFFF'
					}
				}
			}
		}
	}
}
