<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-form ref="formInline" :inline="true" :model="formInline">
          <el-form-item>
            <el-button
              v-permission="'user.create'"
              type="primary"
              icon="el-icon-circle-plus-outline"
              @click="createVisible = true"
            >
              {{ $t('common.create') }}
            </el-button>
          </el-form-item>
          <el-form-item :label="$t('customer.hospital')" prop="hospital">
            <el-autocomplete
              class="inline-input"
              v-model="formInline.hospital"
              :fetch-suggestions="querySearchHospital"
              placeholder="请输入医院名称"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item :label="$t('customer.customer_name')" prop="customer_name">
            <el-autocomplete
              class="inline-input"
              v-model="formInline.customer_name"
              :fetch-suggestions="querySearchCustomerName"
              placeholder="请输入客户名称"
            ></el-autocomplete>
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
            :data="newTableData"
            style="width: 100%"
            class="common-table2"
            :span-method="arraySpanMethod"
          >
            <el-table-column class="el-icon-document-copy" prop="city" :label="$t('customer.city')" />
            <el-table-column prop="county" :label="$t('customer.county')" />
            <el-table-column prop="hospital" :label="$t('customer.hospital')" >
              <template slot-scope="scope">
                <el-button type="primary" plain  v-clipboard="scope.row.hospital" v-clipboard:success="clipboardSuccessHandler">{{ scope.row.hospital }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="department" :label="$t('customer.department')" />
            <el-table-column prop="customer_name" :label="$t('customer.customer_name')">
              <template slot-scope="scope">
                <el-button type="primary" plain  v-clipboard="scope.row.customer_name" v-clipboard:success="clipboardSuccessHandler">{{ scope.row.customer_name }}</el-button>
                <el-button type="primary" >+</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="childPhone" :label="$t('customer.phone')">
              <template slot-scope="scope">
                <el-button type="primary" plain  v-clipboard="scope.row.childPhone" v-clipboard:success="clipboardSuccessHandler">{{ scope.row.childPhone }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="childProduce" :label="$t('customer.produce')" />
            <el-table-column prop="childBasicInformation" :label="$t('customer.basic_information')" />
            <el-table-column prop="childTracker" :label="$t('customer.tracker')" />
            <el-table-column prop="childClinicalRelationship" :label="$t('customer.clinical_relationship')" />
            <el-table-column prop="childBill" :label="$t('customer.bill')" />
            <el-table-column prop="childChannelBusiness" :label="$t('customer.channel_business')" />
            <el-table-column prop="childRecord" :label="$t('customer.record')" />
            <el-table-column prop="childRemark" :label="$t('customer.remark')" />
            <el-table-column prop="childUpdateAt" :label="$t('common.updatedAt')" width="100px"/>
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
              placeholder="请输入所在地市">
          </el-autocomplete>
        </el-form-item>
        <el-form-item :label="$t('customer.county')" prop="county">
          <el-autocomplete
            class="inline-input"
            v-model="createForm.county"
            :fetch-suggestions="querySearchCounty"
            placeholder="请输入所在区县">
          </el-autocomplete>
        </el-form-item>
        <el-form-item :label="$t('customer.hospital')" prop="hospital">
          <el-autocomplete
            class="inline-input"
            v-model="createForm.hospital"
            :fetch-suggestions="querySearchHospital"
            placeholder="请输入医院名称">
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
          <el-select v-model="formInline.customer_name" clearable filterable  placeholder="请选择">
            <el-option
              v-for="item in customerNameList"
              :key="item.customer_name"
              :label="item.customer_name"
              :value="item.customer_name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('customer.produce')" prop="produce">
          <el-input v-model="createForm.produce" />
        </el-form-item>
        <el-form-item :label="$t('customer.basic_information')" prop="basic_information">
          <el-input v-model="createForm.basic_information" />
        </el-form-item>
        <el-form-item :label="$t('customer.tracker')" prop="tracker">
          <el-input v-model="createForm.tracker" />
        </el-form-item>
        <el-form-item :label="$t('customer.clinical_relationship')" prop="clinical_relationship">
          <el-input v-model="createForm.clinical_relationship" />
        </el-form-item>
        <el-form-item :label="$t('customer.bill')" prop="bill">
          <el-input v-model="createForm.bill" />
        </el-form-item>
        <el-form-item :label="$t('customer.channel_business')" prop="channel_business">
          <el-input v-model="createForm.channel_business" />
        </el-form-item>
        <el-form-item :label="$t('customer.record')" prop="record">
          <el-input v-model="createForm.record" />
        </el-form-item>
        <el-form-item :label="$t('customer.remark')" prop="remark">
          <el-input v-model="createForm.remark" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="createLoading" @click="onCreate('createForm')">{{ $t('common.submit') }}</el-button>
          <el-button @click="resetCreateForm('createForm')">{{ $t('common.reset') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      v-el-drag-dialog
      :title="$t('common.update')"
      :visible.sync="updateVisible"
    >
      <el-form ref="updateForm" :model="updateForm" label-width="auto" @submit.native.prevent>
        <el-form-item :label="$t('user.name')" prop="name" :error="updateError.name ? updateError.name[0] : ''">
          <el-input v-model="updateForm.name" />
        </el-form-item>
        <el-form-item :label="$t('user.email')" prop="email" :error="updateError.email ? updateError.email[0] : ''">
          <el-input v-model="updateForm.email" />
        </el-form-item>
        <el-form-item :label="$t('user.password')" prop="password" :error="updateError.password ? updateError.password[0] : ''">
          <el-input v-model="updateForm.password" show-password :placeholder="$t('user.emptyPasswordText')" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="updateLoading" @click="onUpdate('updateForm')">{{ $t('common.submit') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { rTime } from '@/utils'
import { customers, hospitals, customerNames, city, county, phone, produce, tracker, bill, channelBusiness, record, department } from '@/api/customer'

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
        product: '',
        basic_information: '',
        tracker: '',
        clinical_relationship: '',
        bill: '',
        channel_business: '',
        record: '',
        remark: ''
      },
      updateForm: {
        name: '',
        email: '',
        password: ''
      },
      formInline: {
        customer_name: '',
        hospital: '',
        time: ''
      },
      total: 0,
      loading: true,
      order: 'descending',
      sort: 'update_at',
      offset: 0,
      limit: 10,
      hospitalList: [],
      customerNameList: [],
      cityList: [],
      countyList: [],
      phoneList: [],
      produceList: [],
      trackerList: [],
      billList: [],
      channelBusinessList: [],
      recordList: [],
      departmentList: [],
      tableData: [],
      newTableData: [],
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
      updateVisible: false,
      updateId: 0
    }
  },
  mounted() {
    this.getCustomers()
    this.getHospitalList()
    this.getCustomerNameList()
    this.getDepartmentList()
    this.getBillList()
    this.getCityList()
    this.getCountyList()
    this.getPhoneList()
    this.getRecordList()
    this.getChannelBusinessList()
    this.getProduceList()
    this.getTrackerList()
  },
  methods: {
    onUpdate(formName) {
      this.updateError = {}
      this.updateLoading = true
      if (this.updateForm.password === '') {
        delete this.updateForm.password
      }
      update(this.updateForm).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.updateVisible = false
        this.getCustomers()
      }).catch(reason => {
        const { data } = reason.response
        if (data.code === 422) {
          this.updateError = data.data
        }
      }).finally(() => {
        this.updateLoading = false
      })
    },
    onCreate(formName) {
      this.createError = {}
      this.createLoading = true
      create(this.createForm).then(response => {
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
      this.newTableData = []
      this.spanArray = []
      this.tableIndex = 0
      this.loading = true
      const requestData = {
        offset: this.offset,
        limit: this.limit,
        order: this.order,
        sort: this.sort,
        customer_name: this.formInline.customer_name,
        hospital: this.formInline.hospital
      }
      if (rTime(this.formInline.time[0]) !== '') {
        requestData['start_at'] = rTime(this.formInline.time[0])
      }
      if (rTime(this.formInline.time[1]) !== '') {
        requestData['end_at'] = rTime(this.formInline.time[1])
      }
      customers(requestData).then(response => {
        const { data } = response
        this.loading = false
        this.tableData = data.customers

        this.tableData.forEach((item, index) => {
          for (let i = 0; i < item.child.length; i++) {
            const current = {
              id: item.id,
              city: item.city,
              county: item.county,
              hospital: item.hospital,
              department: item.department,
              customer_name: item.customer_name,
              childPhone: item.child[i].phone,
              childProduce: item.child[i].produce,
              childBasicInformation: item.child[i].basic_information,
              childTracker: item.child[i].tracker,
              childClinicalRelationship: item.child[i].clinical_relationship,
              childBill: item.child[i].bill,
              childChannelBusiness: item.child[i].channel_business,
              childRecord: item.child[i].record,
              childRemark: item.child[i].remark,
              childUpdateAt: item.child[i].update_at
            }
            this.newTableData.push(current)
          }
        })
        this.newTableData.forEach((item, index) => {
          // eslint-disable-next-line eqeqeq
          if (index == 0) {
            // 第一项
            this.spanArray.push(1)
            this.tableIndex = 0
          } else {
            // eslint-disable-next-line eqeqeq
            if (this.newTableData[index].id == this.newTableData[index - 1].id) {
              this.spanArray[this.tableIndex] = this.spanArray[this.tableIndex] + 1
              this.spanArray.push(0)
            } else {
              this.spanArray.push(1)
              this.tableIndex = index
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
    rTime(row, column) {
      return rTime(row[column.property])
    },
    handleDelete(id) {
      deleted({
        id: id
      }).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.getCustomers()
      })
    },
    handleEdit(row) {
      this.updateError = {}
      user({
        id: row.id
      }).then(response => {
        const { data } = response
        this.updateVisible = true
        this.updateForm = data
      })
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 3 || columnIndex === 4) {
        const _row = this.spanArray[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    getHospitalList() {
      hospitals().then(response => {
        const { data } = response
        this.loading = false
        this.hospitalList = data
      })
    },
    getCustomerNameList() {
      customerNames().then(response => {
        const { data } = response
        this.loading = false
        this.customerNameList = data
      })
    },
    clipboardSuccessHandler({ value, event }) {
      console.log('success', value)
      this.$message.success('已复制')
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
        this.loading = false
        this.countyList = data
      })
    },
    getPhoneList() {
      phone().then(response => {
        const { data } = response
        this.loading = false
        this.phoneList = data
      })
    },
    getProduceList() {
      produce().then(response => {
        const { data } = response
        this.loading = false
        this.produceList = data
      })
    },
    getTrackerList() {
      tracker().then(response => {
        const { data } = response
        this.loading = false
        this.trackerList = data
      })
    },
    getBillList() {
      bill().then(response => {
        const { data } = response
        this.loading = false
        this.billList = data
      })
    },
    getChannelBusinessList() {
      channelBusiness().then(response => {
        const { data } = response
        this.loading = false
        this.channelBusinessList = data
      })
    },
    getRecordList() {
      record().then(response => {
        const { data } = response
        this.loading = false
        this.recordList = data
      })
    },
    getDepartmentList() {
      department().then(response => {
        const { data } = response
        this.loading = false
        this.departmentList = data
      })
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
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toString().indexOf(queryString.toString()) > -1)
      }
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
    querySearchPhone(queryString, cb) {
      let restaurants = []
      for (let i in this.phoneList) {
        restaurants.push({ 'value': this.phoneList[i].phone })
      }
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    querySearchProduce(queryString, cb) {
      let restaurants = []
      for (let i in this.produceList) {
        restaurants.push({ 'value': this.produceList[i].produce })
      }
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    querySearchTracker(queryString, cb) {
      let restaurants = []
      for (let i in this.trackerList) {
        restaurants.push({ 'value': this.trackerList[i].tracker })
      }
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    querySearchBill(queryString, cb) {
      let restaurants = []
      for (let i in this.billList) {
        restaurants.push({ 'value': this.billList[i].bill })
      }
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    querySearchChannelBusiness(queryString, cb) {
      let restaurants = []
      for (let i in this.channelBusinessList) {
        restaurants.push({ 'value': this.channelBusinessList[i].channel_business })
      }
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    querySearchRecord(queryString, cb) {
      let restaurants = []
      for (let i in this.recordList) {
        restaurants.push({ 'value': this.recordList[i].record})
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
</style>
