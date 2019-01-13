JSONObject parJson = new JSONObject();
                            parJson.put("iw-apikey","123");
                            parJson.put("uuid",prjectUUid);//uuid
                            parJson.put("xmmc",application.getConcreteTrans());//项目名称
                            //项目属性ID
                            if( oldappmap.get("projectAttribute").equals("民间投资")){
                                parJson.put("project_property","01");
                            }else if(oldappmap.get("projectAttribute").equals("国有控股")){
                                parJson.put("project_property","02");
                            }else{
                                parJson.put("project_property","03");
                            }
                            parJson.put("jsgmjnr",oldappmap.get("scaleandinfo"));//项目内容
                            parJson.put("gbhy",oldappmap.get("guobiao"));//国标行业
                            String guobiaoList = sendGet(url,"iw-apikey=123&iw-cmd=nation");
                            JSONObject jsonguobiaoList = JSONObject.parseObject(guobiaoList);
                            JSONObject guobiaoListobject = (JSONObject)jsonguobiaoList.get("data");
                            JSONArray guobiaodata = guobiaoListobject.getJSONArray("list");
                            String guobiaoCode = "8190";//默认其他
                            for (int i = 0; i < guobiaodata.size(); i++) {
                                if(guobiaodata.getJSONObject(i).get("CODENAME").equals(oldappmap.get("guobiao"))){
                                    guobiaoCode = guobiaodata.getJSONObject(i).get("CODE_ID").toString();
                                }
                            }
                            parJson.put("industry",guobiaoCode);//国标行业ID
                            parJson.put("sshy",oldappmap.get("guanli"));//所属行业
                            parJson.put("the_industry",industryMap.get(oldappmap.get("guanli"))!=null?industryMap.get(oldappmap.get("guanli")):"A00099");//所属行业ID


                            String entryTypeList = sendGet(url,"iw-apikey=123&iw-cmd=nation");
                            JSONObject jsonentryTypeList = JSONObject.parseObject(entryTypeList);
                            JSONObject entryTypeobject = (JSONObject)jsonentryTypeList.get("data");
                            JSONArray entryTypedata = entryTypeobject.getJSONArray("list");
                            String entryTypeCode = "8190";//默认其他
                            for (int i = 0; i < entryTypedata.size(); i++) {
                                if(entryTypedata.getJSONObject(i).get("CODENAME").equals(oldappmap.get("guobiao"))){
                                    entryTypeCode = entryTypedata.getJSONObject(i).get("CODE_ID").toString();
                                }
                            }
                            parJson.put("sycyzctmlx_id",entryTypeCode);//适用产业政策条目类型ID
                            parJson.put("sycyzctm",oldappmap.get("isUnPrepar"));//适用产业政策条目
                            //parJson.put("sycyzctm_id",oldappmap.get("money"));//适用产业政策条目ID
                            //是否涉及新增固定资产投资
                            if(oldappmap.get("isNewInve").equals("1")){
                                parJson.put("sfsjxzgdzctz_id","1");//是否涉及新增固定资产投资
                                //parJson.put("tdhqfs_id","1");//土地获取方式id
                                parJson.put("zydmj",oldappmap.get("landTotal"));//总用地面积(平方米)
                                parJson.put("zjzmj",oldappmap.get("buildTotal"));//总建筑面积(平方米)
                                parJson.put("nkgsj",oldappmap.get("expeStratTime"));// 项目拟开始时间
                                parJson.put("njcsj",oldappmap.get("expeEndTime"));//项目拟结束时间
                            }else{
                                parJson.put("sfsjxzgdzctz_id","0");//是否涉及新增固定资产投资
                            }
                            parJson.put("ztz",oldappmap.get("money"));//项目总投资
                            parJson.put("xmzbj",oldappmap.get("ProjectCap"));//项目资本金
                            parJson.put("xmsbdw",application.getApplicantName());//项目申报单位
                            parJson.put("sbzzhm",application.getApplicantDocumentNumber());//证照号码
                            parJson.put("sblxr",application.getApplicantName());//联系人(项目申报单位)
                            parJson.put("sbsjhm",application.getPhone());//手机号码(项目申报单位)
                            parJson.put("xmxxdz",oldappmap.get("buildDetailPlace"));//详细地址
                            String backResult =  InterfaceHttpUtils.sendHttpPost(url+"updateRecordWZ", parJson.toString());
                            System.out.println("请求body:"+parJson.toString());
                            System.out.println("备案外资修改信息返回结果:"+backResult);