/*
 * 办件流程
 */
define([
    'hbs!modules/onlineApply/content/templates/onlineApply.html',
    'modules/onlineApply/content/actions/onlineAction',
    'frm/fish-desktop/third-party/qrcode/fish.qrcode',
    'config/ip',
    'css!modules/onlineApply/content/css/onlineApply.css',

], function (template, onlineAction, qrcode, ip) {
    return fish.View.extend({
        template: template,

        events: {
            "click .js-next-step": "nextClick",
            "click .js-submit": "submitClick",
            "click .js-last-step": "lastClick",
            "click .js-draft": "draftClick",
            "click .delete": "delete",
            "click .fileaction": "setId",
            "click .js-open-form": "openForm",
            "click .download": "download",
            "click .js_copy_matrials": "jsCopyMaterial"
        },

        initialize: function () {
            this.colModelOne = [{
                name: 'id',
                label: '',
                key: true,
                hidden: true
            }, {
                name: 'upload',
                label: '',
                hidden: true
            }, {
                name: 'materialName',
                label: '材料名称',
                width: '15%'
            }, {
                name: 'num',
                label: '要求数量',
                width: '10%'
            }, {
                name: 'requireName',
                label: '材料类型',
                width: '10%'
            }, {
                name: 'templateId',
                label: '范本',
                width: '8%',
                formatter: function (cellval, opts, rwdat, _act) {

                    if ($.isEmptyObject(rwdat.templateId)) {
                        return ''
                    } else {
                        return '<div class="col-md-4" ><button type="button" class="btn btn-xs btn-xs btn-success"><a style="color:white;" class="downLink"  href=" ' + ip.yunnanIp + 'rest/attachment/' + rwdat.templateId + '">下载</a></button></div>'
                    }
                }
            }, {
                name: 'attachId',
                label: '空表',
                width: '8%',
                formatter: function (cellval, opts, rwdat, _act) {

                    if ($.isEmptyObject(rwdat.attachId)) {
                        return ''
                    } else {
                        return '<div class="col-md-4" ><button type="button" class="btn btn-xs btn-xs btn-success"><a style="color:white;" class="downLink"  href=" ' + ip.yunnanIp + 'rest/attachment/' + rwdat.attachId + '">下载</a></button></div>'
                    }
                }
            },{
				name: 'signClaims',
				label: '签字要求',
				width: '10%'
			}, {
				name: 'signatureClaims',
				label: '盖章要求',
				width: '10%'
			}, {
                name: 'OPERATION',
                label: '操作',
                width: '36%',
                formatter: function (cellval, opts, rwdat, _act) {
                    if (rwdat.materialsTypeCode == "3") {
                        return '<div class="btn-group fileaction" data-id="' + rwdat.id + '">' +
                            '<div class="col-md-4" ><button type="button" class="btn btn-xs btn-success js-open-form" data-id="' + rwdat.id + '" data-code="' + rwdat.dynFormCode + '" >表单填写</button></div>' +
                            '</div>'
                    } else {
                        return '<div class="btn-group fileaction" data-id="' + rwdat.id + '">' +
                            '<div class="col-md-3 div_upload ' + rwdat.id + '_uplaod"><span id="uploader" class="btn btn-success btn-xs fileinput-button">' +
                            '<i class="glyphicon glyphicon-plus"></i>' +
                            '<span>上传</span>' +
                            '<input class="multipartFile" name="multipartFile" data-id="' + rwdat.id + '" type="file" multiple=""  title=" ">' +
                            '</span></div>' +
                            '<div class="col-md-2"><span style="font-size:16px;color:orange;margin-left: 5px;margin-top:3px;"  class="glyphicon glyphicon-question-sign tooltip-icon js-met-tip"></span></div>' +
                            '<div  class="col-md-2 download ' + rwdat.id + '_download" hidden="hidden"><button type="button" class="btn btn-xs btn-xs btn-success js_download " data-id="' + rwdat.id + '">下载</button></div>' +
                            '<div class="col-md-2 delete ' + rwdat.id + '_delete" hidden="hidden"><button type="button" class="btn btn-xs btn-danger js_delete " data-id="' + rwdat.id + '">删除</button></div>' +
                            '<div class="col-md-3" style="display:inline;" ><button type="button" class="btn btn-xs btn-success js_copy_matrials " data-id="' + rwdat.id + '" >材料复用</button></div>' +
                            '</div>'
                    }

                }
            }, {
                name: 'comments',
                label: '备注',
                width: '10%'
            }];

            this.colModelTwo = [{
                name: 'id',
                label: '',
                key: true,
                hidden: true
            }, {
                name: 'upload',
                label: '',
                hidden: true
            }, {
                name: 'materialName',
                label: '材料名称',
                width: '30%'
            }, {
                name: 'num',
                label: '要求数量',
                width: '25%'
            }, {
                name: 'requireName',
                label: '材料类型',
                width: '25%'
            }, {
                name: 'templateId',
                label: '范本',
                width: '20%',
                formatter: function (cellval, opts, rwdat, _act) {

                    if ($.isEmptyObject(rwdat.templateId)) {
                        return ''
                    } else {
                        return '<div class="col-md-4" ><button type="button" class="btn btn-xs btn-xs btn-success"><a style="color:white;" class="downLink"  href=" ' + ip.yunnanIp + 'rest/attachment/' + rwdat.templateId + '">下载</a></button></div>'
                    }
                }
            }, {
                name: 'attachId',
                label: '空表',
                width: '20%',
                formatter: function (cellval, opts, rwdat, _act) {

                    if ($.isEmptyObject(rwdat.attachId)) {
                        return ''
                    } else {
                        return '<div class="col-md-4" ><button type="button" class="btn btn-xs btn-xs btn-success"><a style="color:white;" class="downLink"  href=" ' + ip.yunnanIp + 'rest/attachment/' + rwdat.attachId + '">下载</a></button></div>'
                    }
                }
            },{
				name: 'signClaims',
				label: '签字要求',
				width: '20%'
			}, {
				name: 'signatureClaims',
				label: '盖章要求',
				width: '20%'
			}, {
                name: 'comments',
                label: '备注',
                width: '20%'
            }];
            window.addEventListener("message", function (e) {
                if (this.dateTime != e.data.dateTime)
                    return;
                if (e.data.exemethod == "isValidCallback") {
                    fish.info("请完善自定义表单数据");
                    return;
                }
                if (e.data.exemethod == "insertCallback") {
                    //遮罩层
                    $.blockUI({
                        message: '加载中',
                    });
                    this.inParam.dynamicDatas.work.customerDataId = e.data.data.id;
                    onlineAction.submitMaterial(this.inParam, function (data) {
                        $.unblockUI();
                        if ($('#content').data('full-screen')) {
                            $('#content').data('full-screen', false);
                        }
                        if (data.code == 1) {
                            this.$(".notice").hide();
                            this.$(".declare").hide();
                            this.$(".onlineFooter").hide();
                            this.$(".onlineFooter1").hide();
                            this.$(".inform").show();
                            this.$(".lc_icon1").attr("src", "images/lc_icon_c1.png");
                            this.$(".lc_icon2").attr("src", "images/lc_icon_c2.png");
                            this.$(".lc_icon3").attr("src", "images/lc_icon_a3.png");
                            var erweima = '<div class="qrtitle"><img src="images/duihao.png" alt=""  class=""/>申报告知单</div><img src="images/wsbs_kuang.png" alt="" class="qrkuang" /><div class="qrcode"></div>  <div class="qrid">尊敬的<span>' + this.name + '</span>用户：</div><div class="qrtishi">您好，您申报的[<font color="#FE7062">' + this.$(".onlineName").html() + '</font> ]已经申报成功。办件查询码为[<span class="wsbs_queryNo">' + data.resultDatas.queryNo + '</span>]。您可以在南京江北新区服务网上大厅，“用户网页”中查询办理进度”</div>'
                            this.$(".billContent").append(erweima)
                            var qrcodes = ip.qrcode + "wechat/modules/evaluate/templates/Qrcode.html?type=c&code=" + data.resultDatas.queryNo
                            $('.qrcode').qrcode({
                                width: 100, //宽度
                                height: 100, //高度
                                text: qrcodes
                            });

                        } else {
                            this.$(".notice").hide();
                            this.$(".declare").hide();
                            this.$(".onlineFooter").hide();
                            this.$(".onlineFooter1").hide();
                            this.$(".inform").show();
                            this.$(".lc_icon1").attr("src", "images/lc_icon_c1.png");
                            this.$(".lc_icon2").attr("src", "images/lc_icon_c2.png");
                            this.$(".lc_icon3").attr("src", "images/lc_icon_a3.png");
                            this.$(".billContent").html("不好意思，接件失败，请重新申报");
                        }
                    }.bind(this));
                }
            }.bind(this))
        },

        afterRender: function () {

            $(".navbar_list>li").css("background-color", "#0a7bc9");
            $(".wsbs").css("background-color", "#085799");

            this.$sex = this.$('.gender').combobox({
                editable: false,
                dataTextField: 'name',
                dataValueField: 'value',
                dataSource: [{
                    name: '男',
                    value: 'M'
                }, {
                    name: '女',
                    value: 'F'
                }]
            });

            this.$accessType = this.$('.accessType').combobox({
                editable: false,
                dataTextField: 'name',
                dataValueField: 'value',
                dataSource: [{
                    name: '窗口取件',
                    value: 'S'
                }, {
                    name: '邮寄送达',
                    value: 'L'
                }],
            });

            this.btime = this.$(".birthDate").datetimepicker({
                todayBtn: true,
                format: "yyyy-mm-dd"
            });
            this.btime = this.$(".agentBirthDate").datetimepicker({
                todayBtn: true,
                format: "yyyy-mm-dd"
            });
            this.agree = false
            this.$('.ischeck').on("change", function () {
                if (this.$('.ischeck').prop('checked')) {
                    this.agree = true
                } else {
                    this.agree = false
                }
                //           	console.log(this.agree)
            }.bind(this))

            //取登录账号的基本信息，初始化
            onlineAction.getUserAccount(function (data) {

                this.name = data.user.trueName;
                this.userId = data.user.id;
                //								console.log("1234:", data.userOrg.orgName);
                if (data.user.userType.code != "P") {
                    this.$(".fddbr").css("display", "block");
                }
                this.$(".applicantType").val(data.user.userType.title);

                if (data.user.userType.title == "个人") {

                    this.$(".applicantCertNo").val(data.user.idCardNo);

                    onlineAction.qryCardType(function (data) {
                        //						console.log(data, 11)
                        this.$(".applicantName").val(this.name);
                        this.$('.applicantCertType').combobox({
                            editable: false,
                            dataTextField: 'valueName',
                            dataValueField: 'valueCode',
                            dataSource: data
                        }).combobox('value', data[0].valueCode);

                    }.bind(this))
                } else {
                    //统一社会信用代码
                    this.$(".applicantCertNo").val(data.userOrg.orgCardNo);

                    onlineAction.qryFrCardType(function (data1) {
                        //						console.log("data:",data)
                        this.$(".applicantName").val(data.userOrg.orgName);

                        this.$('.applicantCertType').combobox({
                            editable: false,
                            dataTextField: 'valueName',
                            dataValueField: 'valueCode',
                            dataSource: data1
                        }).combobox('value', data1[0].valueCode);

                    }.bind(this))
                }

                this.$(".mobilePhone").val(data.user.phoneNum);
                this.$(".email").val(data.user.email);
                this.$(".address").val(data.user.address);
                var birthDate1 = data.user.idCardNo.substring(6, 10)
                var birthDate2 = data.user.idCardNo.substring(10, 12)
                var birthDate3 = data.user.idCardNo.substring(12, 14)

                var birthDate = birthDate1 + "-" + birthDate2 + "-" + birthDate3

                this.$(".birthDate").val(birthDate);

                if (data.user.sex.code == 2) {
                    this.$sex.combobox('value', 'F');
                } else {
                    this.$sex.combobox('value', 'M');
                }

            }.bind(this));

            var keyId = this.GetQueryString("keyId");
            if (keyId == null || keyId == "null") {
                this.$accessType.combobox({
                    value: 'S'
                });
                //实时监控邮寄方式下拉框的值
                this.$('.hidePick').hide()
                this.$accessType.on('combobox:change', function () {
                    //自然人证照上传
                    if (this.$(".accessType").val() == "S") {
                        this.$('.hidePick').hide();
                        this.$('.userName,.phoneNum,.zipcode,.pickupAddress').val("")
                    } else {
                        this.$('.hidePick').show()
                    }
                }.bind(this));
                var itemId = this.GetQueryString("id");
                onlineAction.qryitemList(itemId, function (data) {
                    this.materialList = data.materialTwoList;
                    this.$materialGrid1.grid("reloadData", this.materialList);
                    if (!$.isEmptyObject(this.materialList)) {
                        this.$materialGrid1.grid({
                            height: this.materialList.length * 29 + 27
                        });
                    }

                    this.$('.multipartFile').fileupload({
                        url: ip.portalIp + 'rest/attachment',
                        dataType: 'json',
                        maxFileSize: 10000000,
                        autoUpload: false,
                        singleFileUploads: false,
                        progressall: function (e, data) {
                            $.blockUI();
                        },
                        add: function (e, data) {
                            var fileName = data.fileInput.context.files[0].name;
                            var fileNameB = fileName.substring(fileName.lastIndexOf('.') + 1);
                            if (fileNameB != "exe" && fileNameB != "sh" && fileNameB != "bat" && fileNameB != "cmd") {
                                data.submit();
                            } else {
                                fish.info("上传的附件不符合格式要求,请勿上传'.exe,.sh,.bat,.cmd'或无后缀名文件");
                                return;
                            }

                        }.bind(this),
                        done: function (e, data) {
                            $.unblockUI();
                            var res = data.result;
                            var row = this.$materialGrid1.grid("getRowData", this.currentId);
                            if (row.upload == null) {
                                row.upload = [];
                            }
                            var nownum = row.upload.length;
                            for (i = 0; i < res.length; i++) {
                                var file = {};
                                file.id = res[i].id;
                                file.attachId = res[i].id;
                                file.seq = i;
                                file.trueName = res[i].trueName;
                                file.materialName = row.materialName;
                                file.itemMaterialId = row.id;
                                file.fileType = res[i].fileType;
                                row.upload[nownum + i] = file;
                            }
                            row.state = "已上传";
                            this.$materialGrid1.grid("modTreeNode", row, row);
                            this.$("." + this.currentId + "_download").show();
                            this.$("." + this.currentId + "_delete").show();

                        }.bind(this),
                        processalways: function (e, data) {
                            $.unblockUI();
                            var index = data.index,
                                file = data.files[index];
                            if (file.error && file.error === "File is too large") {
                                fish.error({
                                    message: "选择文件过大,请选择低于100MB的文件",
                                    modal: true
                                });
                                return;
                            }

                        },
                        fail: function (e, data) {
                            $.unblockUI();
                            $('input[name="attachId"]').val(data.files[0].name);
                            fish.info("上传失败");
                        },
                    });

                }.bind(this));

            } else {
                this.inpram = {
                    'keyId': keyId,
                    'servicePath': "WorkProcessService",
                };

                onlineAction.qryBJdetail(this.inpram, function (data) {
                    this.materialList = data.dynamicData.materials;
                    for (var i = 0; i < this.materialList.length; i++) {
                        this.materialList[i].idOne = this.materialList[i].id;
                        this.materialList[i].id = this.materialList[i].itemMaterialId;
                    }
                    this.$materialGrid1.grid("reloadData", this.materialList);
                    if (!$.isEmptyObject(this.materialList)) {
                        this.$materialGrid1.grid({
                            height: this.materialList.length * 29 + 27
                        });
                    }

                    this.$('.multipartFile').fileupload({
                        url: ip.portalIp + 'rest/attachment',
                        dataType: 'json',
                        maxFileSize: 10000000,
                        autoUpload: false,
                        singleFileUploads: false,
                        progressall: function (e, data) {
                            $.blockUI();
                        },
                        add: function (e, data) {
                            var fileName = data.fileInput.context.files[0].name;
                            var fileNameB = fileName.substring(fileName.lastIndexOf('.') + 1);
                            if (fileNameB != "exe" && fileNameB != "sh" && fileNameB != "bat" && fileNameB != "cmd") {
                                data.submit();
                            } else {
                                fish.info("上传的附件不符合格式要求,请勿上传'.exe,.sh,.bat,.cmd'或无后缀名文件");
                                return;
                            }

                        }.bind(this),
                        done: function (e, data) {
                            $.unblockUI();
                            var res = data.result;
                            var row = this.$materialGrid1.grid("getRowData", this.currentId);
                            if (row.upload == null) {
                                row.upload = [];
                            }
                            var nownum = row.upload.length;
                            for (i = 0; i < res.length; i++) {
                                var file = {};
                                file.id = res[i].id;
                                file.attachId = res[i].id;
                                file.seq = i;
                                file.trueName = res[i].trueName;
                                file.materialName = row.materialName;
                                file.itemMaterialId = row.id;
                                row.upload[nownum + i] = file;
                            }
                            row.state = "已上传";
                            this.$materialGrid1.grid("modTreeNode", row, row);
                            this.$("." + this.currentId + "_download").show();
                            this.$("." + this.currentId + "_delete").show();

                        }.bind(this),
                        processalways: function (e, data) {
                            $.unblockUI();

                            var index = data.index,
                                file = data.files[index];
                            if (file.error && file.error === "File is too large") {
                                fish.error({
                                    message: "选择文件过大,请选择低于100MB的文件",
                                    modal: true
                                });
                                return;
                            }

                        },
                        fail: function (e, data) {
                            $.unblockUI();

                            $('input[name="attachId"]').val(data.files[0].name);
                            fish.info("上传失败");
                        },
                    });

                    //材料按钮逻辑
                    for (var i = 0; i < data.dynamicData.materials.length; i++) {
                        if (data.dynamicData.materials[i] != null && data.dynamicData.materials[i].upload != null && data.dynamicData.materials[i].upload.length > 0) {
                            this.$("." + data.dynamicData.materials[i].id + "_download").show();
                            this.$("." + data.dynamicData.materials[i].id + "_delete").show();
                        }
                    }

                    if (data.dynamicData.accessWay.accessType.code == "L") {
                        this.$accessType.combobox({
                            value: "L"
                        });
                    } else {
                        this.$accessType.combobox({
                            value: "S"
                        });
                        this.$('.hidePick').hide();
                    }
                    this.$(".applicantName").val(data.dynamicData.work.applicantName);
                    this.$(".applicantZipCode").val(data.dynamicData.work.applicantZipCode);
                    this.$(".fixedPhone").val(data.dynamicData.work.fixedPhone);
                    this.$(".mobilePhone").val(data.dynamicData.work.mobilePhone);
                    this.$(".email").val(data.dynamicData.work.email);
                    this.$(".projectCode").val(data.dynamicData.work.projectCode);
                    this.$(".address").val(data.dynamicData.work.address);
                    this.$(".comments").val(data.dynamicData.work.comments);
                    this.$accessType.on('combobox:change', function () {
                        if (this.$(".accessType").val() == "S") {
                            this.$('.hidePick').hide();
                        } else {
                            this.$('.hidePick').show();
                        }
                    }.bind(this));

                }.bind(this))

            }

            var itemId = this.GetQueryString("id");
            onlineAction.qryitemList(itemId, function (data) {
                this.customerFormCode = data.customerFormCode;
                //自定义表单
                if (this.customerFormCode) {
                    onlineAction.queryCustomerContentUrl(function (data) {
                        this.$("#mainFrame").attr("src", data + "/" + this.customerFormCode);
                    }.bind(this))
                    window.addEventListener("message", function (e) {
                        if (e.data.exemethod == "formHeight"){
                            this.$(".mainFrame").attr("height",e.data.height);
                        }
                        if (e.data.exemethod == "afterLoad") {
                            if (!this.dateTime) {
                                this.dateTime = e.data.dateTime;
                            }
                            if (this.dateTime != e.data.dateTime)
                                return;
                            this.$(".mainFrame").attr("height", (document.body.scrollHeight/2)-200);
                            $('button').filter('.js-next-step').click(function(){
                                $(".mainFrame")[0].contentWindow.postMessage({method:"getFormHeight"}, "*");
                            })
                        }
                    }.bind(this))
                    this.$("#mainFrame").show();
                    this.$(".customertitle").show();
                }

                this.materialList = data.materialTwoList;
                this.$materialGrid2.grid("reloadData", this.materialList);
                if (!$.isEmptyObject(this.materialList)) {
                    this.$materialGrid2.grid({
                        height: this.materialList.length * 26 + 27
                    });
                }
                var data = data;
                if (data.levelItemType == "E") {
                    this.$(".onlineName").html(data.dealItemName);
                    this.$(".projectName").val(data.dealItemName);
                } else {
                    this.$(".onlineName").html(data.name);
                    this.$(".projectName").val(data.name);
                }
                var reg = new RegExp("\n", "g");
                var result = data.acceptCondition.replace(reg, "</br>");
                this.$(".acceptCondition").html(result);
                setTimeout(function () {
                    this.$(".js-met-tip").tooltip({
                        placement: "top",
                        title: function () {
                            return "上传材料大小请勿超过100M";
                        },
                        trigger: 'hover'
                    });
                }.bind(this), 0);

            }.bind(this));

            this.$materialGrid1 = this.$(".js-material-grid1").grid({
                autowidth: true,
                colModel: this.colModelOne,
                //				height:300,
                onSelectRow: function (t, rowid, state, e) {
                    var row = this.$materialGrid1.grid("getRowData", rowid);
//                    					console.log("row1:",row)
                    this.rowdata = row;
                    var lastrow = this.$materialGrid1.grid("getRowData", this.lastrow);
                    if (this.lastrow != -1 && lastrow.dicRequireId != 3) {
                        this.$materialGrid1.grid('saveRow', this.lastrow);
                        this.$materialGrid1.grid('restoreRow', this.lastrow);
                    }
                    if (rowid && this.lastrow != rowid && row.dicRequireId != 3) {
                        this.$materialGrid1.grid('editRow', rowid, true);
                        this.lastrow = rowid;
                    } else {
                        this.lastrow = rowid;
                    }
                }.bind(this)
            });

            this.$materialGrid2 = this.$(".js-material-grid2").grid({
                autowidth: true,
                colModel: this.colModelTwo,
                //				height:300,
                onSelectRow: function (t, rowid, state, e) {
                    var row = this.$materialGrid2.grid("getRowData", rowid);
                    //					console.log("row2:",row)

                    var lastrow = this.$materialGrid2.grid("getRowData", this.lastrow);
                    if (this.lastrow != -1 && lastrow.dicRequireId != 3) {
                        this.$materialGrid2.grid('saveRow', this.lastrow);
                        this.$materialGrid2.grid('restoreRow', this.lastrow);
                    }
                    if (rowid && this.lastrow != rowid && row.dicRequireId != 3) {
                        this.$materialGrid2.grid('editRow', rowid, true);
                        this.lastrow = rowid;
                    } else {
                        this.lastrow = rowid;
                    }
                }.bind(this)
            });

        },
        //下载
        download: function (e) {
            this.currentId = this.$(e.target).data("id");
            var row = this.$materialGrid1.grid("getRowData", this.currentId);
            if (row.upload != null && row.upload.length > 0) {
                fish.popupView({
                    url: 'modules/downLoad/views/DownloadPopWin',
                    viewOption: row,
                    close: function () {

                    }.bind(this)
                });
            }
        },

        nextClick: function () {
            this.$(".notice").hide();
            this.$(".declare").show();
            this.$(".onlineFooter").hide();
            this.$(".onlineFooter1").show();
            this.$(".lc_icon1").attr("src", "images/lc_icon_c1.png");
            this.$(".lc_icon2").attr("src", "images/lc_icon_a2.png");
        },

        lastClick: function () {
            this.$(".notice").show();
            this.$(".declare").hide();
            this.$(".onlineFooter").show();
            this.$(".onlineFooter1").hide();
            this.$(".lc_icon1").attr("src", "images/lc_icon_a1.png");
            this.$(".lc_icon2").attr("src", "images/lc_icon_b2.png");
        },

        //材料复用
        jsCopyMaterial: function () {
            this.applicantCertType = this.$(".applicantCertType").val();
            this.applicantCertNo = this.$(".applicantCertNo").val();
            this.applicantType = this.$(".applicantType").val();
            fish.popupView({
                url: 'modules/onlineApply/content/views/copyMaterialsAll',
                viewOption: {
                    applicantCertType: this.applicantCertType,
                    applicantCertNo: this.applicantCertNo,
                    materialCode: this.rowdata.materialCode,
                    applicantType: this.applicantType,
                    userId: this.userId
                },
                close: function (res) {
                    var row = this.$materialGrid1.grid("getRowData", this.currentId);
                    if (row.upload == null) {
                        row.upload = [];
                    }
                    var nownum = row.upload.length;
                    for (i = 0; i < res.length; i++) {
                        var file = {};
                        file.id = res[i].attachId;
                        file.attachId = res[i].attachId;
                        file.trueName = res[i].trueName;
                        file.materialName = row.materialName;
                        file.itemMaterialId = row.id;
                        file.fileType = res[i].fileType;
                        row.upload[nownum + i] = file;
                    }
                    row.state = "已上传";
                    this.$materialGrid1.grid("modTreeNode", row, row);
                    this.$("." + this.currentId + "_download").show();
                    this.$("." + this.currentId + "_delete").show();
                }.bind(this)
            });
        },

        submitClick: function () {
            if (!this.agree) {
                fish.info("请阅读并修改免责协议！");
                return false;
            }
            var pickup = this.$('.js-form-pickup').form("value");
            if (pickup.accessType == "L") {
                var result = this.$(".js-form-pickup").isValid();
                if (!result) {
                    fish.info("数据填写有误，请检查并重新填写。");
                    return false;
                }
            }
            // this.$('.js-submit').attr("disabled", true)
            //遮罩层
            // $.blockUI({
            //     message: '加载中',
            // })
            /*接件*/
            this.$qryForm = this.$(".js-form").form();
            if (!this.$qryForm.isValid()) {
                $.unblockUI();
                return;
            }
            var lastrow = this.$materialGrid1.grid("getRowData", this.lastrow);
            if (this.lastrow != -1 && lastrow.dicRequireId != 3) {
                this.$materialGrid1.grid('saveRow', this.lastrow);
                this.$materialGrid1.grid('restoreRow', this.lastrow);
            }
            var rows = this.$materialGrid1.grid("getRowData");
            var data = [];
            var param = {};
            var updataData = [];
            param.accessWayInfo = pickup;
            for (var i = 0; i < rows.length; i++) {
                var file = {};
                file.itemMaterialId = rows[i].id;
                file.dicRequireCode = rows[i].code;
                file.materialName = rows[i].name;
                if (rows[i].dicRequireId != 3 && rows[i].wmcode) {
                    file.wmcode = rows[i].wmcode;
                }
                var upload = rows[i].upload;
                var s = "";
                if ((upload == null || upload.length == 0) && rows[i].dicRequireId == 3) {
                    fish.info("材料" + rows[i].materialName + "未上传");
                    return;
                }
                if (upload != null && upload.length > 0) {
                    fish.forEach(upload, function (item) {
                        updataData.push(item)
                    }.bind(this))
                }
                data[data.length] = file;
            }
            param.work = this.$(".js-form").form("value");
            if (param.work.applicantType == "个人") {
                param.work.applicantType = "1";
            } else {
                param.work.applicantType = "2";

            }
            if (param.work.birthDate == "") {
                $.unblockUI();
                fish.info("信息不完整")
            } else {
                param.work.applySource = "02";
                param.work.itemOrThemeId = this.GetQueryString("id");
                param.work.isAgent = "N";

                param.materials = data;
                param.workMaterialFileList = updataData;

                $('#content').data('full-screen', true);
                param.work.birthDate = param.work.birthDate + " 00:00:00";
                var keyId = this.GetQueryString("keyId");
                if (keyId == null || keyId == "null") {
                    keyId = " ";
                }
                this.inParam = {
                    stateCode: "01-01-02",
                    keyId: keyId,
                    stateCodeName: "申请",
                    servicePath: "WorkProcessService",
                    bizKey: 'WORK_PRE',
                    dynamicDatas: param,
                };
            }
            if (this.customerFormCode) {
                //提交信息
                var submitInparam = {
                    method: "submit"
                }
                this.$(".mainFrame")[0].contentWindow.postMessage(submitInparam, "*");
            } else {
                onlineAction.submitMaterial(this.inParam, function (data) {
                    $.unblockUI();
                    if ($('#content').data('full-screen')) {
                        $('#content').data('full-screen', false);
                    }
                    if (data.code == 1) {
                        this.$(".notice").hide();
                        this.$(".declare").hide();
                        this.$(".onlineFooter").hide();
                        this.$(".onlineFooter1").hide();
                        this.$(".inform").show();
                        this.$(".lc_icon1").attr("src", "images/lc_icon_c1.png");
                        this.$(".lc_icon2").attr("src", "images/lc_icon_c2.png");
                        this.$(".lc_icon3").attr("src", "images/lc_icon_a3.png");
                        var erweima = '<div class="qrtitle"><img src="images/duihao.png" alt=""  class=""/>申报告知单</div><img src="images/wsbs_kuang.png" alt="" class="qrkuang" /><div class="qrcode"></div>  <div class="qrid">尊敬的<span>' + this.name + '</span>用户：</div><div class="qrtishi">您好，您申报的[<font color="#FE7062">' + this.$(".onlineName").html() + '</font> ]已经申报成功。办件查询码为[<span class="wsbs_queryNo">' + data.resultDatas.queryNo + '</span>]。您可以在海口市政务服务网上大厅(wssp.haikou.gov.cn)“用户网页”或“我要查”中查询办理进度”</div>'
                        this.$(".billContent").append(erweima)
                        var qrcodes = ip.qrcode + "wechat/modules/evaluate/templates/Qrcode.html?type=c&code=" + data.resultDatas.queryNo
                        $('.qrcode').qrcode({
                            width: 100, //宽度
                            height: 100, //高度
                            text: qrcodes
                        });

                    } else {
                        this.$(".notice").hide();
                        this.$(".declare").hide();
                        this.$(".onlineFooter").hide();
                        this.$(".onlineFooter1").hide();
                        this.$(".inform").show();
                        this.$(".lc_icon1").attr("src", "images/lc_icon_c1.png");
                        this.$(".lc_icon2").attr("src", "images/lc_icon_c2.png");
                        this.$(".lc_icon3").attr("src", "images/lc_icon_a3.png");
                        this.$(".billContent").html("不好意思，接件失败，请重新申报");
                    }
                }.bind(this));
            }
        },
        submitClickFun: function (id) {

        },
        //保存草稿
        draftClick: function () {
            var pickup = this.$('.js-form-pickup').form("value");
            if (pickup.accessType == "L") {
                var result = this.$(".js-form-pickup").isValid();
                if (!result) {
                    fish.info("数据填写有误，请检查并重新填写。");
                    return false;
                }
            }
            //遮罩层
            $.blockUI({
                message: '加载中',
            })
            /*接件*/
            this.$qryForm = this.$(".js-form").form();
            if (!this.$qryForm.isValid()) {
                $.unblockUI();
                return;
            }
            var lastrow = this.$materialGrid1.grid("getRowData", this.lastrow);
            if (this.lastrow != -1 && lastrow.dicRequireId != 3) {
                this.$materialGrid1.grid('saveRow', this.lastrow);
                this.$materialGrid1.grid('restoreRow', this.lastrow);
            }
            var rows = this.$materialGrid1.grid("getRowData");
            var data = [];
            var param = {};
            var updataData = [];
            param.accessWayInfo = pickup;
            for (var i = 0; i < rows.length; i++) {
                var file = {};
                file.itemMaterialId = rows[i].id;
                file.dicRequireCode = rows[i].code;
                file.materialName = rows[i].name;
                if (rows[i].dicRequireId != 3 && rows[i].wmcode) {
                    file.wmcode = rows[i].wmcode;
                }
                var upload = rows[i].upload;
                var s = "";
                if ((upload == null || upload.length == 0) && rows[i].dicRequireId == 3) {
                    fish.info("材料" + rows[i].materialName + "未上传");
                    return;
                }
                if (upload != null && upload.length > 0) {
                    fish.forEach(upload, function (item) {
                        updataData.push(item)
                    }.bind(this))
                }
                data[data.length] = file;
            }
            param.work = this.$(".js-form").form("value");
            if (param.work.applicantType == "个人") {
                param.work.applicantType = "1";
            } else {
                param.work.applicantType = "2";
            }
            if (param.work.birthDate == "") {
                $.unblockUI();
                fish.info("信息不完整")
            } else {
                param.work.applySource = "02";
                param.work.itemOrThemeId = this.GetQueryString("id");
                param.work.isAgent = "N";
                param.materials = data;
                param.workMaterialFileList = updataData;
                $('#content').data('full-screen', true);
                param.work.birthDate = param.work.birthDate + " 00:00:00";
                var inParam = {
                    stateCode: "01-01-01",
                    stateCodeName: "保存草稿",
                    servicePath: "WorkProcessService",
                    bizKey: 'WORK_PRE',
                    dynamicDatas: param,
                };
                onlineAction.submitMaterial(inParam, function (data) {
                    $.unblockUI();
                    if ($('#content').data('full-screen')) {
                        $('#content').data('full-screen', false);
                    }
                    if (data.code == 1) {
                        //保存成功
                        fish.info("保存草稿成功")
                    } else {
                        //保存失败
                        fish.info("不好意思，保存草稿失败，请重新保存")
                    }
                }.bind(this));
            }

        },

        setId: function (e) {
            this.currentId = this.$(e.target).data("id");

        },

        openForm: function (e) {
            this.formCode = this.$(e.target).data("code");
            fish.popupView({
                url: "modules/applyProject/content/views/elecform",
                viewOption: {
                    formCode: this.formCode,
                    rowdata: this.rowdata
                },
                close: function (msg) {
                    var row = this.$materialGrid1.grid("getRowData", this.currentId);
                    if (row.upload == null) {
                        row.upload = [];
                    }
                    var file = {
                        attachId: msg,
                        id: msg,
                        itemMaterialId: row.itemMaterialId,
                        fileType: "form",
                        trueName: "自定义表单"
                    };
                    row.upload[0] = file;

                    this.$materialGrid1.grid("modTreeNode", row, row);
                    this.$(".js-open-form").html("重新填表")
                }.bind(this)
            });
        },

        delete: function (e) {
            this.currentId = this.$(e.target).data("id");
            var row = this.$materialGrid1.grid("getRowData", this.currentId);
            if (row.upload != null && row.upload.length > 0) {
                fish.popupView({
                    url: 'modules/onlineApply/content/views/DeletePopWin',
                    viewOption: row,
                    close: function (rows) {
                        //						console.log("rows:",rows)
                        row.upload = rows;
                        if (rows.length > 0) {
                            row.state = "已上传";
                            //this.$("." + this.currentId + "_download").show();
                            this.$("." + this.currentId + "_delete").show();
                        } else {
                            row.state = "未上传";
                            this.$("." + this.currentId + "_download").hide();
                            this.$("." + this.currentId + "_delete").hide();
                        }
                        this.$materialGrid1.grid("modTreeNode", row, row);
                    }.bind(this)
                });
            }
        },

        GetQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }

    });
});