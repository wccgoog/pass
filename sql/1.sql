WITH PageData AS 
    ( 
        SELECT row_number() OVER(ORDER BY  ISNULL(logs.LastReportDate,ModifyDate) desc)
        AS rownumber,[Name],[State],
        ( 
            select Name from (
                select Status id,Name from T_FORM_FormTableStatus where TableName='T_CUS_401'
                )
            as refTable where isnull(refTable.ID,'')=isnull(temp.State,'')
        ) 
        as [State_Display],[Address],[Longitude],[Latitude],logs.[LastReportName], CONVERT
        (
            varchar(20),logs.[LastReportDate],120
        ) 
        as [LastReportDate],logs.[LastReportNote],[IsNFC],[PROP_BH], CONVERT(varchar(20),[PROP_YXSJ],111) 
        as [PROP_YXSJ],[PROP_Remark],[PROP_LX],
        (
            select Name from (
            select code ID,Comment Name From FixedAssetsUserCode where parentID=1 and IsDelete=0) 
            as refTable where isnull(refTable.ID,'')=isnull(temp.PROP_LX,'')
        ) 
        as [PROP_LX_Display],[PROP_FLOOR],[ID],[Longitude],[Latitude],GPosition.STAsText() GPosition,GPosition.MakeValid().STGeometryType() 
        as sType,[UPID],[IOrder],0 as [childCount],[CurrentDept],[Creater],[CreateDate],'equ_icon01.gif' 
        as Icon  , 
        (
            STUFF(
                    (
                        select ','+FilePath from T_FORM_FormTableDataFiles tfftf with(nolock) 
                        where tfftf.fid=temp.ID and ISNULL(tfftf.IsDeleted,0)!=1 and isnull(tfftf.FieldID,'')='' 
                        for xml path('')
                    )
                    ,1,1,''
                )
        ) 
        FilePath, ModifyDate  FROM T_CUS_401 temp with(nolock) left join 
        (
            select distinct t.ID_LOG,FormTableID,LastLogID,LastReportName,t.LastReportDate,LastReportNote,LastReportContent,LastFaultDesc 
            from T_CUS_401_Log t with(nolock),(select ID_LOG,MAX(LastReportDate) LastReportDate from T_CUS_401_Log with(nolock) where '' = FormTableID or '' = '' 
            group by ID_LOG) b where t.ID_LOG= b.ID_LOG and t.LastReportDate = b.LastReportDate
        ) 
        logs on temp.ID = logs.ID_LOG  where State <> '-1'  and State in 
        (
        select Status from T_FORM_FormTableStatus with(nolock) where TableName = 'T_CUS_401' and PlanState <> 2  and Status <> -1 
        )  
    ) 
SELECT * FROM PageData ZZ INNER JOIN 
(
    select (1-1)*100+number crownumber from master..spt_values where type='p' and number between 1 and 100
) 
CC ON ZZ.rownumber=CC.crownumber order by rownumber 