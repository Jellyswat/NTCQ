using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace 水稻网页.utils.NTCQ
{
    public class Data
    {
        public static string getData()
        {
            DataTable dt = SqlUtils.Read("select startTime,endTime,Num,sectionName from DataListSet A,SectionListSet B where SectionList_Id=B.Id and B.Valid=1 order by endTime DESC");
            return JsonConvert.SerializeObject(dt);
        }

        public static string DataTimeNum(string startTime, string endTime)
        {
            startTime += " 00:00:00:000";
            endTime += " 00:00:00:000";
            DataTable dt = SqlUtils.Read("select startTime,endTime,Num,sectionName from DataListSet A,SectionListSet B where SectionList_Id=B.Id and B.Valid=1 and startTime>='"+startTime+"' and endTime<='"+endTime+"' order by endTime DESC");
            return JsonConvert.SerializeObject(dt);
        }

        public static string exportData()
        {
            Result res = new Result();
            res.errCode = "0";
            DataTable dt = SqlUtils.Read("select startTime,endTime,Num,sectionName from DataListSet A,SectionListSet B where SectionList_Id=B.Id and B.Valid=1 order by endTime DESC");
            if (dt == null || dt.Rows.Count <= 0)
            {
                res.errCode = "-1";
                res.errMsg = "无数据，无法导出";
            }
            else
            {
                dt.TableName = "Result";
                dt.Columns["startTime"].ColumnName = "开始时间";
                dt.Columns["endTime"].ColumnName = "结束时间";
                dt.Columns["Num"].ColumnName = "数量";
                dt.Columns["sectionName"].ColumnName = "地区名";
            }
            string filename = DateTime.Now.ToString("yyyyMMddhhmmss") + ".xlsx";
            res.errMsg = "/ExcelFile/DownLoad/" + filename;
            res.errCode = "0";
            Excel e = new Excel(HttpContext.Current.Server.MapPath(res.errMsg));
            e.DataTableToExcel(dt);
            return JsonConvert.SerializeObject(res);
        }

    }
}