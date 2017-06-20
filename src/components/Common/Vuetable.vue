<template>
  <table class="table table-hover table-striped">
    <thead>
      <tr>
        <template v-for="field in fields">
            <template v-if="isSpecialField(field.name)">
              <th v-if="extractName(field.name) == '__checkbox'">
                <input id="check-all" type="checkbox" @change="toggleAllCheckboxes(field.name, $event)"
                  :checked="checkCheckboxesState(field.name)">
              </th>
							<th v-else-if="extractName(field.name) == '__opration'">
								{{ getTitle(field) }}
							</th>
            </template>
            <template v-else>
              <th :id="'_' + field.name">
                {{  getTitle(field) }}
              </th>
            </template>
        </template>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, index) in tableData">
        <tr>
          <template v-for="field in fields">
              <template v-if="isSpecialField(field.name)">
                <td v-if="extractName(field.name) == '__checkbox'">
                  <input type="checkbox"
                    @change="toggleCheckbox(item, field.name, $event)"
                    :checked="rowSelected(item, field.name)">
                </td>
                <td v-else-if="extractName(field.name) == '__opration'">
									<span class="btn btn-xs btn-success" @click="exeOpration(field.name.split(':')[2],item[field.name.split(':')[1]])">{{ field.name.split(':')[3] }}</span>
                </td>
              </template>
              <template v-else>
                <td>
                {{item[field.name]}}
                </td>
              </template>
          </template>
        </tr>
      </template>
    </tbody>
  </table>
</template>
<script>
export default {
	data: function() {
		return {
			selectedItems: [],
			optionVal:''
		}
	},
	props: {
		fields: {
			type: Array,
			required: true
		},
		tableData: {
			type: Array,
			required: true
		}
	},
	methods: {
		isSpecialField: function(fieldName) {
		  return fieldName.slice(0, 2) === '__'
		},
		toggleAllCheckboxes: function(fieldName, event) {
			console.log('change')
			let idColumn = fieldName.split(':')[1]
			if(this.selectedItems.length === 0) {
				this.selectedItems = this.tableData.map(function(item) {
					return item[idColumn]
				})
			}else {
				this.selectedItems = []
			}
			console.log(this.selectedItems)
		},
		getTitle: function(field) {
		  if (typeof field.title === 'undefined') {
		    return field.name.replace('.', ' ')
		  }
		  return field.title
		},
		exeOpration: function(name,ids) {
			this.$router.push('/' + this.$route.path.split('/')[1] + '/' + name + '/' + ids)
		},
		extractName: function(string) {
		  return string.split(':')[0].trim()
		},
		checkCheckboxesState: function(fieldName) {
			console.log('check')
			if(this.selectedItems.length === this.tableData.length
			 && this.selectedItems.length != 0) {
				return true
			}
		},
		toggleCheckbox: function(dataItem, fieldName, event) {
			let idColumn = fieldName.split(':')[1]
			let index = this.selectedItems.indexOf(dataItem[idColumn])
			if(index >= 0) {
				this.selectedItems.splice(index,1)
				return false
			}else {
				this.selectedItems.push(dataItem[idColumn])
				return true
			}
			
		},
		rowSelected: function(dataItem, fieldName){
			let idColumn = fieldName.split(':')[1]
			return this.selectedItems.indexOf(dataItem[idColumn]) >= 0
		}
	},
	watch: {
		selectedItems:function(val) {
			this.$emit('change-selected',val)
		},
		tableData:function() {
			this.selectedItems = []
		}
	}
}
</script>
<style scoped>
.table {
	border:1px solid #D4D4D5;
	border-top: .2em solid #ef2f32;
	margin: 0 -1px;
}
.table tr th, .table tr td {
	border-left: 1px solid rgba(34,36,38,.1); 
	text-align: center;
}
</style>