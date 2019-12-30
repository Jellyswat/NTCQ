using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace 水稻网页.utils.NTCQ
{
    public class Section
    {
        public static string getSection()
        {
            DataTable dt = SqlUtils.Read("select Id,sectionName from SectionListSet where Valid=1");
            return JsonConvert.SerializeObject(dt);
        }

        public static string addSection(string sectionName)
        {
            Result res = new Result();
            if(SqlUtils.COM("insert SectionListSet(sectionName) values(N'"+sectionName+"')") >0)
            {
                res.errCode = "0";
            }
            else
            {
                res.errCode = "-1";
                res.errMsg = "添加失败，请重试!";
            }
            Log.writeLog(HttpContext.Current.Session["adminDataId"].ToString(), "添加地区名："+sectionName);
            return JsonConvert.SerializeObject(res);
        }

        public static string delSection(string sectionId)
        {
            Result res = new Result();
            if (SqlUtils.COM("update SectionListSet set Valid=0 where Id="+sectionId) > 0)
            {
                res.errCode = "0";
            }
            else
            {
                res.errCode = "-1";
                res.errMsg = "删除失败，请重试!";
            }
            Log.writeLog(HttpContext.Current.Session["adminDataId"].ToString(), "删除地区号：" + sectionId);
            return JsonConvert.SerializeObject(res);
        }

    }
}