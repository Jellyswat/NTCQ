using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace 水稻网页.utils.NTCQ
{
    public class Log
    {
        public static void writeLog(string userId,string Affair)
        {
            string nowTime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff");
            int tem = SqlUtils.COM("insert LogListSet(Affair,UserInfo_Id,Time) values(N'" + Affair + "'," + userId + ",'" + nowTime + "')");
        }

        public static string getLog()
        {
            DataTable dt = SqlUtils.Read("select UserName,Affair,Time from LogListSet,UserInfoSet where UserInfo_Id=UserInfoSet.Id order by Time DESC");
            return JsonConvert.SerializeObject(dt);
        }
    }
}