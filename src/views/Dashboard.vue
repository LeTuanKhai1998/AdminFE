<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total traffic"
                                type="gradient-red"
                                sub-title="350,897"
                                icon="ni ni-active-40"
                                class="mb-4 mb-xl-0" >

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total traffic"
                                type="gradient-orange"
                                sub-title="2,356"
                                icon="ni ni-chart-pie-35"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 12.18%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Sales"
                                type="gradient-green"
                                sub-title="924"
                                icon="ni ni-money-coins"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-danger mr-2"><i class="fa fa-arrow-down"></i> 5.72%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Performance"
                                type="gradient-info"
                                sub-title="49,65%"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 54.8%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
                </div>
            </div>
        </base-header>

        <!--Charts-->
        <div class="container-fluid mt--7">
            <div class="row">
                <div class=" mb-5 mb-xl-0" style="width: 100% !important;">
                    <card type="default" header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h6 class="text-light text-uppercase ls-1 mb-1">Tổng quan</h6>
                                <h5 class="h3 text-white mb-0">Top phim mới xem nhiều</h5>
                            </div>
                            <div class="col">
                                <ul class="nav nav-pills justify-content-end">
                                    <li class="nav-item mr-2 mr-md-0">
                                        <base-input addon-left-icon="ni ni-calendar-grid-58">
                                            <flat-picker slot-scope="{focus, blur}"
                                                         @on-open="focus"
                                                         @on-close="blur"
                                                         :config="{allowInput: true, mode: 'range'}"
                                                         class="form-control datepicker"
                                                         v-model="dates.range">
                                            </flat-picker>
                                        </base-input>
                                    </li>
                                    <li class="nav-item mr-2 mr-md-0">
                                        <a class="nav-link py-2 px-3"
                                           href="#"
                                           :class="{active: bigLineChart.activeIndex === 1}"
                                           @click.prevent="initBigChart(1)">
                                            <span class="d-none d-md-block">30 ngày vừa qua</span>
                                            <span class="d-md-none">M</span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link py-2 px-3"
                                           href="#"
                                           :class="{active: bigLineChart.activeIndex === 0}"
                                           @click.prevent="initBigChart(0)">
                                            <span class="d-none d-md-block">7 ngày vừa qua</span>
                                            <span class="d-md-none">W</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

<!--                        <line-chart-->
<!--                                :height="350"-->
<!--                                ref="bigChart"-->
<!--                                :chart-data="bigLineChart.chartData"-->
<!--                                :extra-options="bigLineChart.extraOptions">-->
<!--                        </line-chart>-->
                        <bar-chart
                                :height="350"
                                ref="barChart"
                                :chart-data="bigLineChart.chartData">
                        </bar-chart>
                    </card>
                </div>

            </div>

            <!-- End charts-->

            <!--Tables-->
            <div class="row mt-5">
                <div class="col-xl-8 mb-5 mb-xl-0">
                    <page-visits-table></page-visits-table>
                </div>
                <div class="col-xl-4">
                    <social-traffic-table></social-traffic-table>
                </div>
            </div>
            <!--End tables-->
        </div>

    </div>
</template>
<script>
    // Charts
    import * as chartConfigs from '@/components/Charts/config';
    // import LineChart from '@/components/Charts/LineChart';
    import BarChart from '@/components/Charts/BarChart';
    import flatPicker from "vue-flatpickr-component";

    // Tables
    import SocialTrafficTable from './Dashboard/SocialTrafficTable';
    import PageVisitsTable from './Dashboard/PageVisitsTable';
    import dateUtil from "../utils/dateUtil";
    import MovieService from "../services/MovieService";

    export default {
        components: {
            flatPicker,
            // LineChart,
            BarChart,
            PageVisitsTable,
            SocialTrafficTable,
        },
        data() {
            return {
                formDate: {
                    dateIn: "",
                    dateOut: "",
                },
                dates: {
                    range: ""
                },
                bigLineChart: {
                    allData: [],
                    activeIndex: 1,
                    chartData: {
                        datasets: [],
                        labels: [],
                    },
                    extraOptions: chartConfigs.blueChartOptions,
                },
                redBarChart: {
                    chartData: {
                        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [{
                            label: 'Sales',
                            data: [25, 20, 30, 22, 17, 29]
                        }]
                    }
                }
            };
        },
        watch: {
            'dates.range'(val) {
                if (val) {
                    var slipt = val.split(' to ');
                    if (slipt.length > 1) {
                        this.formDate.dateIn = slipt[0];
                        this.formDate.dateOut = slipt[1];
                        this.prepation();
                    }
                }
            }
        },
        created() {
            this.getDate(this.bigLineChart.activeIndex);
            this.setDateRange();
            // this.prepation();
        },
        methods: {
            // eslint-disable-next-line no-unused-vars
            setBigChart(data) {
                var datas = [];
                var labels = [];
                data.forEach(item => {
                    datas.push(item.num_view);
                    labels.push(item.name);
                })

                let chartData = {
                    datasets: [
                        {
                            label: 'Lượt xem',
                            data: datas
                        }
                    ],
                    labels: labels,
                };
                this.bigLineChart.chartData = chartData;
                this.bigLineChart.activeIndex = -1;
            },
            prepation() {
                MovieService.getTopViewByTime(this.formDate)
                    .then(respose => {
                        this.setBigChart(respose.data.data.data);
                    });
            },
            setDateRange() {
                this.dates.range = this.formDate.dateIn + ' to ' + this.formDate.dateOut;
            },
            getDate(index) {
                var date = new Date();
                switch (index) {
                    case 0:
                        this.formDate.dateOut = dateUtil.formatDate(date);
                        date.setDate(date.getDate() - 7);
                        this.formDate.dateIn = dateUtil.formatDate(date);
                        break;
                    default:
                        this.formDate.dateOut = dateUtil.formatDate(date);
                        date.setDate(date.getDate() - 30);
                        this.formDate.dateIn = dateUtil.formatDate(date);
                        break;
                }
                // eslint-disable-next-line no-console
                console.log("dateOut", this.formDate.dateOut)
                // eslint-disable-next-line no-console
                console.log("dateIn", this.formDate.dateIn)
            },
            // eslint-disable-next-line no-unused-vars
            initBigChart(index) {
                this.getDate(index)
                this.prepation();
                this.bigLineChart.activeIndex = index;
            }
        },
        mounted() {
            this.initBigChart(1);
        }
    };
</script>
<style></style>
