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
            <el-input v-model="formInline.searchData" :placeholder="$t('channelBusiness.search')" />
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
              prop="hospital"
              :label="$t('channelBusiness.hospital')"
              class="el-icon-search"
              style="width: 5%">
              <template slot-scope="scope">
                <el-button icon="el-icon-search" circle @click="handleDetail(scope.row.hospital.value)"></el-button>
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
              prop="channel_business"
              :label="$t('channelBusiness.channelBusiness')"
              style="width: 5%">
              <template slot-scope="scope">
                <el-button icon="el-icon-search" circle @click="handleDetail(scope.row.channel_business.value)"></el-button>
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
            <el-table-column
              prop="phone"
              :label="$t('channelBusiness.phone')"
              style="width: 8%">
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
              prop="company"
              :label="$t('channelBusiness.company')"
              style="width: 5%">
              <template slot-scope="scope">
                <el-input
                  type="textarea"
                  autosize
                  v-if="scope.row.company.edit"
                  ref="company"
                  v-model="scope.row.company.value"
                  style="width: 100%;height: 100%;border: none"
                  @blur="changeData(scope.row, scope.column)">
                </el-input>
                <span v-else-if="scope.row.company.value==''"  class="set"><i class="el-icon-edit edit"></i></span>
                <span v-else v-html="preText(scope.row.company.value)"></span>
              </template>
            </el-table-column>
            <el-table-column
              prop="produce"
              :label="$t('channelBusiness.produce')"
              min-width="60px">
              <template slot-scope="scope">
                <el-input
                  type="textarea"
                  autosize
                  v-if="scope.row.produce.edit"
                  ref="produce"
                  v-model="scope.row.produce.value"
                  style="width: 100%;height: 100%;border: none"
                  @blur="changeData(scope.row, scope.column)">
                </el-input>
                <span v-else-if="scope.row.produce.value==''"  class="set"><i class="el-icon-edit edit"></i></span>
                <span v-else v-html="preText(scope.row.produce.value)"></span>
              </template>
            </el-table-column>
            <el-table-column
              prop="money"
              :label="$t('channelBusiness.money')"
              style="width: 10%">
              <template slot-scope="scope">
                <el-input
                  type="textarea"
                  autosize
                  v-if="scope.row.money.edit"
                  ref="money"
                  v-model="scope.row.money.value"
                  style="width: 100%;height: 100%;border: none"
                  @blur="changeData(scope.row, scope.column)">
                </el-input>
                <span v-else-if="scope.row.money.value==''"  class="set"><i class="el-icon-edit edit"></i></span>
                <span v-else v-html="preText(scope.row.money.value)"></span>
              </template>
            </el-table-column>
            <el-table-column
              prop="business_time"
              :label="$t('channelBusiness.businessTime')"
              min-width="150px">
              <template slot-scope="scope">
                <el-input
                  type="textarea"
                  autosize
                  v-if="scope.row.business_time.edit"
                  ref="business_time"
                  v-model="scope.row.business_time.value"
                  style="width: 100%;height: 100%;border: none"
                  @blur="changeData(scope.row, scope.column)">
                </el-input>
                <span v-else-if="scope.row.business_time.value==''"  class="set"><i class="el-icon-edit edit"></i></span>
                <span v-else v-html="preText(scope.row.business_time.value)"></span>
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
        <el-form-item :label="$t('channelBusiness.hospital')" prop="hospital">
          <el-autocomplete
            class="inline-input"
            v-model="createForm.hospital"
            :fetch-suggestions="querySearchHospital"
            placeholder="请输入医疗机构">
          </el-autocomplete>
        </el-form-item>
        <el-form-item :label="$t('channelBusiness.channelBusiness')" prop="channel_business">
          <el-autocomplete
            class="inline-input"
            v-model="createForm.channel_business"
            :fetch-suggestions="querySearchChannelBusiness"
            placeholder="请输入渠道商">
          </el-autocomplete>
        </el-form-item>
        <el-form-item :label="$t('channelBusiness.phone')" prop="phone">
          <el-input v-model="createForm.phone" placeholder="请输入手机号"/>
        </el-form-item>
        <el-form-item :label="$t('channelBusiness.company')" prop="company" >
          <el-autocomplete
              class="inline-input"
              v-model="createForm.company"
              :fetch-suggestions="querySearchCompany"
              placeholder="请输入公司">
          </el-autocomplete>
        </el-form-item>
        <el-form-item :label="$t('channelBusiness.produce')" prop="produce">
          <el-autocomplete
            class="inline-input"
            v-model="createForm.produce"
            :fetch-suggestions="querySearchProduce"
            placeholder="请输入产品">
          </el-autocomplete>
        </el-form-item>
        <el-form-item :label="$t('channelBusiness.money')" prop="money">
          <el-input v-model="createForm.money" placeholder="请输入成交金额"/>
        </el-form-item>
        <el-form-item :label="$t('channelBusiness.businessTime')" prop="business_time">
          <el-input v-model="createForm.business_time" placeholder="请输入成交时间"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="createLoading" @click="onCreateChannelBusiness('createForm')">{{ $t('common.submit') }}</el-button>
          <el-button @click="resetCreateForm('createForm')">{{ $t('common.reset') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { channelBusiness, companyList, produceList, createChannelBusiness, updateChannelBusiness, deleteChannelBusiness } from '@/api/channel-business'
import { hospital, channelBusinessList } from '@/api/customer'
export default {
  name: 'channelBusiness.channelBusiness',
  data() {
    return {
      createForm: {
        hospital: '',
        channel_business: '',
        phone: '',
        company: '',
        produce: '',
        money: '',
        business_time: ''
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
      channelBusiness: [],
      companyList: [],
      produceList: [],
      channelBusinessList: [],
      hospitalList: [],
      tableData: [],
      spanArray: [],
      tableIndex: 0,
      createError: {},
      createLoading: false,
      createVisible: false,
      updateError: {},
      updateLoading: false,
      updateId: 0
    }
  },
  mounted() {
    this.getCompanyList()
    this.getProduceList()
    this.getChannelBusinessList()
    this.getHospitalList()
  },
  created() {
    this.getChannelBusiness()
  },
  methods: {
    handleDetail(row) {
      this.$router.push({ path: '/customer/index', query: { searchData: row }})
    },
    onCreateChannelBusiness(formName) {
      this.createError = {}
      this.createLoading = true
      createChannelBusiness(this.createForm).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.resetCreateForm(formName)
        this.createVisible = false
        this.offset = 0
        this.getChannelBusiness()
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
      deleteChannelBusiness(id).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.getChannelBusiness()
      })
    },
    resetCreateForm(formName) {
      this.$refs[formName].resetFields()
    },
    onSubmit() {
      this.offset = 0
      this.getChannelBusiness()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.offset = 0
      this.formInline.searchData = null
      this.$route.query.searchData = null
      this.getChannelBusiness()
    },
    getChannelBusiness() {
      this.spanArray = []
      this.tableIndex = 0
      this.tableData = []
      this.loading = true
      if (this.$route.query.searchData) {
        this.formInline.searchData = this.$route.query.searchData
        this.$route.query.searchData = null
      }
      const requestData = {
        offset: this.offset,
        limit: this.limit,
        order: this.order,
        sort: this.sort,
        search_data: this.formInline.searchData
      }
      channelBusiness(requestData).then(response => {
        const { data } = response
        this.loading = false
        this.tableData = data.channel_business
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
      this.getChannelBusiness()
    },
    handleCurrentChange(val) {
      this.offset = val
      this.getChannelBusiness()
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toString().indexOf(queryString.toString()) > -1)
      }
    },
    querySearchCompany(queryString, cb) {
      let restaurants = []
      for (let i in this.companyList) {
        restaurants.push({ 'value': this.companyList[i].company})
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
      console.log(this.produceList)
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    querySearchChannelBusiness(queryString, cb) {
      let restaurants = []
      for (let i in this.channelBusinessList) {
        restaurants.push({ 'value': this.channelBusinessList[i].channel_business})
      }
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    querySearchHospital(queryString, cb) {
      console.log(this.hospitalList)
      let restaurants = []
      for (let i in this.hospitalList) {
        restaurants.push({ 'value': this.hospitalList[i].hospital })
      }
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    getCompanyList() {
      companyList().then(response => {
        const { data } = response
        this.loading = false
        this.companyList = data
      })
    },
    getProduceList() {
      produceList().then(response => {
        const { data } = response
        this.loading = false
        this.produceList = data
      })
    },
    getChannelBusinessList() {
      channelBusinessList().then(response => {
        const { data } = response
        this.loading = false
        this.channelBusinessList = data
      })
    },
    getHospitalList() {
      hospital().then(response => {
        const { data } = response
        this.loading = false
        this.hospitalList = data
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
      await updateChannelBusiness(params).then(response => {
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
      if (pretext === null || pretext === '') {
        return ''
      }
      if (typeof(pretext) !== 'string') {
        pretext = pretext.toString()
      }
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
  .el-autocomplete{
    width: 100%;
  }
</style>
