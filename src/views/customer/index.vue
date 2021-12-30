<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-form ref="formInline" :inline="true" :model="formInline">
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-circle-plus-outline"
              @click="createVisible = true"
            >
              {{ $t('common.create') }}
            </el-button>
          </el-form-item>
          <el-form-item  prop="searchData">
            <el-input v-model="formInline.searchData" :placeholder="$t('customer.search')" />
          </el-form-item>
          <el-col>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">{{ $t('common.search') }}</el-button>
              <el-button @click="resetForm('formInline')">{{ $t('common.reset') }}</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
      <el-col v-loading="loading" :span="24">
        <el-col :span="24">
          <el-table
            highlight-current-row
            :data="tableData"
            style="width: 100%"
            class="common-table2"
            @cell-dblclick="cellEdit"
          >
            <el-table-column
              prop="city"
              :label="$t('customer.city')"
              style="width: 5%">
              <template slot-scope="scope">
                <el-input
                  type="textarea"
                  autosize
                  v-if="scope.row.city.edit"
                  ref="city"
                  v-model="scope.row.city.value"
                  style="width: 100%;height: 100%;border: none"
                  @blur="changeData(scope.row, scope.column)">
                </el-input>
                <span v-else-if="scope.row.city.value==''"  class="set"><i class="el-icon-edit edit"></i></span>
                <span v-else v-html="preText(scope.row.city.value)"></span>
              </template>
            </el-table-column>
            <el-table-column
              prop="county"
              :label="$t('customer.county')"
              style="width: 5%">
              <template slot-scope="scope">
                <el-input
                  type="textarea"
                  autosize
                  v-if="scope.row.county.edit"
                  ref="county"
                  v-model="scope.row.county.value"
                  style="width: 100%;height: 100%;border: none"
                  @blur="changeData(scope.row, scope.column)">
                </el-input>
                <span v-else-if="scope.row.county.value==''"  class="set"><i class="el-icon-edit edit"></i></span>
                <span v-else v-html="preText(scope.row.county.value)"></span>
              </template>
            </el-table-column>
            <el-table-column
              prop="hospital"
              :label="$t('customer.hospital')"
              style="width: 8%">
              <template slot-scope="scope">
                <el-input
                  type="textarea"
                  autosize
                  v-if="scope.row.hospital.edit"
                  ref="hospital"
                  v-model="scope.row.hospital.value"
                  style="width: 100%;height: 100%;border: none"
                  @blur="changeData(scope.row, scope.column)">
                </el-input>
                <span v-else-if="scope.row.hospital.value==''"  class="set"><i class="el-icon-edit edit"></i></span>
                <span v-else v-html="preText(scope.row.hospital.value)"></span>
              </template>
            </el-table-column>
            <el-table-column
              prop="department"
              :label="$t('customer.department')"
              style="width: 5%">
              <template slot-scope="scope">
                <el-input
                  type="textarea"
                  autosize
                  v-if="scope.row.department.edit"
                  ref="department"
                  v-model="scope.row.department.value"
                  style="width: 100%;height: 100%;border: none"
                  @blur="changeData(scope.row, scope.column)">
                </el-input>
                <span v-else-if="scope.row.department.value==''"  class="set"><i class="el-icon-edit edit"></i></span>
                <span v-else v-html="preText(scope.row.department.value)"></span>
              </template>
            </el-table-column>
            <el-table-column
              prop="customer_name"
              :label="$t('customer.customer_name')"
              min-width="60px">
              <template slot-scope="scope">
                <el-input
                  type="textarea"
                  autosize
                  v-if="scope.row.customer_name.edit"
                  ref="customer_name"
                  v-model="scope.row.customer_name.value"
                  style="width: 100%;height: 100%;border: none"
                  @blur="changeData(scope.row, scope.column)">
                </el-input>
                <span v-else-if="scope.row.customer_name.value==''"  class="set"><i class="el-icon-edit edit"></i></span>
                <span v-else v-html="preText(scope.row.customer_name.value)"></span>
              </template>
            </el-table-column>
            <el-table-column
              prop="phone"
              :label="$t('customer.phone')"
              style="width: 10%">
              <template slot-scope="scope">
                <el-input
                  type="textarea"
                  autosize
                  v-if="scope.row.phone.edit"
                  ref="phone"
                  v-model="scope.row.phone.value"
                  style="width: 100%;height: 100%;border: none"
                  @blur="changeData(scope.row, scope.column)">
                </el-input>
                <span v-else-if="scope.row.phone.value==''"  class="set"><i class="el-icon-edit edit"></i></span>
                <span v-else v-html="preText(scope.row.phone.value)"></span>
              </template>
            </el-table-column>
            <el-table-column
              prop="information"
              :label="$t('customer.information')"
              min-width="150px">
              <template slot-scope="scope">
                <el-input
                  type="textarea"
                  autosize
                  v-if="scope.row.information.edit"
                  ref="information"
                  v-model="scope.row.information.value"
                  style="width: 100%;height: 100%;border: none"
                  @blur="changeData(scope.row, scope.column)">
                </el-input>
                <span v-else-if="scope.row.information.value==''"  class="set"><i class="el-icon-edit edit"></i></span>
                <span v-else v-html="preText(scope.row.information.value)"></span>
              </template>
            </el-table-column>
            <el-table-column
              prop="demand"
              :label="$t('customer.demand')"
              min-width="150px">
              <template slot-scope="scope">
                <el-input
                  type="textarea"
                  autosize
                  v-if="scope.row.demand.edit"
                  ref="demand"
                  v-model="scope.row.demand.value"
                  style="width: 100%;height: 100%;border: none"
                  @blur="changeData(scope.row, scope.column)">
                </el-input>
                <span v-else-if="scope.row.demand.value==''"  class="set"><i class="el-icon-edit edit"></i></span>
                <span v-else v-html="preText(scope.row.demand.value)"></span>
              </template>
            </el-table-column>
            <el-table-column
              min-width="200px"
              prop="visit"
              :label="$t('customer.visit')">
              <template slot-scope="scope">
                <el-input
                  type="textarea"
                  autosize
                  v-if="scope.row.visit.edit"
                  ref="visit"
                  v-model="scope.row.visit.value"
                  style="width: 100%;height: 100%;border: none"
                  @blur="changeData(scope.row, scope.column)">
                </el-input>
                <span v-else-if="scope.row.visit.value==''"  class="set"><i class="el-icon-edit edit"></i></span>
                <span v-else v-html="preText(scope.row.visit.value)"></span>
              </template>
            </el-table-column>
            <el-table-column
              style="width: 10%"
              prop="channel_business"
              :label="$t('customer.channel_business')">
              <template slot-scope="scope">
                <el-input
                  type="textarea"
                  autosize
                  v-if="scope.row.channel_business.edit"
                  ref="channel_business"
                  v-model="scope.row.channel_business.value"
                  style="width: 100%;height: 100%;border: none"
                  @blur="changeData(scope.row, scope.column)">
                </el-input>
                <span v-else-if="scope.row.channel_business.value==''"  class="set"><i class="el-icon-edit edit"></i></span>
                <span v-else v-html="preText(scope.row.channel_business.value)"></span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('common.handle')" width="100px">
              <template slot-scope="scope">
                <el-popconfirm
                  :title="$t('common.confirmDelete')"
                  :confirm-button-text="$t('common.confirmButtonText')"
                  :cancel-button-text="$t('common.cancelButtonText')"
                  @onConfirm="handleDelete(scope.row.id.value)"
                >
                  <el-button
                    slot="reference"
                    icon="el-icon-delete"
                    type="danger"
                  >
                  </el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24" class="margin-t-10">
          <el-pagination
            :page-sizes="[10, 25, 50]"
            :page-size="10"
            :current-page="offset"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-col>
      </el-col>
    </el-row>
    <el-dialog
      v-el-drag-dialog
      :title="$t('common.create')"
      :visible.sync="createVisible"
    >
      <el-form ref="createForm" :model="createForm" label-width="auto" @submit.native.prevent>
        <el-form-item :label="$t('customer.city')" prop="city" >
          <el-autocomplete
              class="inline-input"
              v-model="createForm.city"
              :fetch-suggestions="querySearchCity"
              placeholder="请输入地市">
          </el-autocomplete>
        </el-form-item>
        <el-form-item :label="$t('customer.county')" prop="county">
          <el-autocomplete
            class="inline-input"
            v-model="createForm.county"
            :fetch-suggestions="querySearchCounty"
            placeholder="请输入区县">
          </el-autocomplete>
        </el-form-item>
        <el-form-item :label="$t('customer.hospital')" prop="hospital">
          <el-autocomplete
            class="inline-input"
            v-model="createForm.hospital"
            :fetch-suggestions="querySearchHospital"
            placeholder="请输入医疗机构">
          </el-autocomplete>
        </el-form-item>
        <el-form-item :label="$t('customer.department')" prop="department">
          <el-autocomplete
            class="inline-input"
            v-model="createForm.department"
            :fetch-suggestions="querySearchDepartment"
            placeholder="请输入科室">
          </el-autocomplete>
        </el-form-item>
        <el-form-item :label="$t('customer.customer_name')" prop="customer_name">
          <el-autocomplete
            class="inline-input"
            v-model="createForm.customer_name"
            :fetch-suggestions="querySearchCustomerName"
            placeholder="请输入客户名称">
          </el-autocomplete>
        </el-form-item>
        <el-form-item :label="$t('customer.phone')" prop="phone">
          <el-input v-model="createForm.phone" placeholder="请输入手机号"/>
        </el-form-item>
        <el-form-item :label="$t('customer.information')" prop="综合情况">
          <el-input v-model="createForm.information" />
        </el-form-item>
        <el-form-item :label="$t('customer.demand')" prop="demand" placeholder="请输入需求意向">
          <el-input v-model="createForm.demand" />
        </el-form-item>
        <el-form-item :label="$t('customer.visit')" prop="visit">
          <el-input v-model="createForm.visit" placeholder="请输入拜访记录"/>
        </el-form-item>
        <el-form-item :label="$t('customer.channel_business')" prop="channel_business">
          <el-input v-model="createForm.channel_business" placeholder="请输入渠道商"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="createLoading" @click="onCreateCustomer('createForm')">{{ $t('common.submit') }}</el-button>
          <el-button @click="resetCreateForm('createForm')">{{ $t('common.reset') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { customers, createCustomer, deletedCustomer, updateCustomer, city, county, hospital, department, customerName } from '@/api/customer'

export default {
  name: 'customer.customers',
  data() {
    return {
      createForm: {
        city: '',
        county: '',
        hospital: '',
        department: '',
        customer_name: '',
        phone: '',
        information: '',
        demand: '',
        visit: '',
        channel_business: ''
      },
      updateForm: {
        city: '',
        county: '',
        hospital: '',
        department: '',
        customer_name: '',
        phone: '',
        information: '',
        demand: '',
        visit: '',
        channel_business: ''
      },
      formInline: {
        searchData: ''
      },
      total: 0,
      loading: true,
      order: 'descending',
      sort: 'updated_at',
      offset: 0,
      limit: 10,
      customerNameList: [],
      cityList: [],
      countyList: [],
      hospitalList: [],
      departmentList: [],
      tableData: [],
      spanArray: [],
      tableIndex: 0,
      pickerOptions: {
        shortcuts: [{
          text: this.$t('common.week'),
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t('common.oneMonth'),
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t('common.threeMonth'),
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      createError: {},
      createLoading: false,
      createVisible: false,
      updateError: {},
      updateLoading: false,
      updateId: 0
    }
  },
  mounted() {
    this.getCityList()
    this.getCountyList()
    this.getHospitalList()
    this.getDepartmentList()

    this.getCustomerNameList()
  },
  created() {
    this.getCustomers()
  },
  methods: {
    onCreateCustomer(formName) {
      this.createError = {}
      this.createLoading = true
      createCustomer(this.createForm).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.resetCreateForm(formName)
        this.createVisible = false
        this.offset = 0
        this.getCustomers()
      }).catch(reason => {
        const { data } = reason.response
        if (data.code === 422) {
          this.createError = data.data
        }
      }).finally(() => {
        this.createLoading = false
      })
    },
    handleDelete(id) {
      deletedCustomer(id).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.getCustomers()
      })
    },
    resetCreateForm(formName) {
      this.$refs[formName].resetFields()
    },
    onSubmit() {
      this.offset = 0
      this.getCustomers()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.offset = 0
      this.getCustomers()
    },
    getCustomers() {
      this.spanArray = []
      this.tableIndex = 0
      this.loading = true
      const requestData = {
        offset: this.offset,
        limit: this.limit,
        order: this.order,
        sort: this.sort,
        search_data: this.formInline.searchData
      }
      customers(requestData).then(response => {
        const { data } = response
        this.loading = false
        this.tableData = data.customers

        this.tableData.forEach((item, index) => {
          item.index = index + 1
          for(let i in item) {
            item[i] = {
              value: item[i],
              edit: false
            }
          }
        })
        this.total = data.total
      }).catch(reason => {
        this.loading = false
        this.tableData = []
        this.total = 0
      })
    },
    handleSizeChange(val) {
      this.limit = val
      this.getCustomers()
    },
    handleCurrentChange(val) {
      this.offset = val
      this.getCustomers()
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toString().indexOf(queryString.toString()) > -1)
      }
    },
    querySearchCity(queryString, cb) {
      let restaurants = []
      for (let i in this.cityList) {
        restaurants.push({ 'value': this.cityList[i].city})
      }
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    querySearchCounty(queryString, cb) {
      let restaurants = []
      for (let i in this.countyList) {
        restaurants.push({ 'value': this.countyList[i].county})
      }
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    querySearchHospital(queryString, cb) {
      let restaurants = []
      for (let i in this.hospitalList) {
        restaurants.push({ 'value': this.hospitalList[i].hospital })
      }
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    querySearchDepartment(queryString, cb) {
      let restaurants = []
      for (let i in this.departmentList) {
        restaurants.push({ 'value': this.departmentList[i].department })
      }
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    querySearchCustomerName(queryString, cb) {
      let restaurants = []
      for (let i in this.customerNameList) {
        restaurants.push({ 'value': this.customerNameList[i].customer_name})
      }
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    getCityList() {
      city().then(response => {
        const { data } = response
        this.loading = false
        this.cityList = data
      })
    },
    getCountyList() {
      county().then(response => {
        const { data } = response
        this.loading = true
        this.countyList = data
      })
    },
    getHospitalList() {
      hospital().then(response => {
        const { data } = response
        this.loading = false
        this.hospitalList = data
      })
    },
    getDepartmentList() {
      department().then(response => {
        const { data } = response
        this.loading = false
        this.departmentList = data
      })
    },
    getCustomerNameList() {
      customerName().then(response => {
        const { data } = response
        this.loading = false
        this.customerNameList = data
      })
    },
    cellEdit(row, column, cell, event) {
      if (row[column.property]) {
        row[column.property].edit = true
        setTimeout(() => {
          this.$refs[column.property].focus()
        }, 20)
      }
    },
    async changeData(row, column) {
      let params = {
        id: row.id.value,
        column: column.property,
        edit_value: row[column.property].value
      }
      await updateCustomer(params).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
      }).catch(reason => {
        const { data } = reason.response
        if (data.code === 422) {
          this.updateError = data.data
        }
      }).finally(() => {
        row[column.property].edit = false
      })
    },
    preText(pretext) {
      return pretext.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;')
    }
  }
}
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-table .cell {
  white-space: pre-line;
  }
</style>
