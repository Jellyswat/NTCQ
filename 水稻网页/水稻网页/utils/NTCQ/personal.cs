using Newtonsoft.Json;
using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace 水稻网页.utils.NTCQ
{
    public class personal
    {
        public static string doLogin(string UserName,string PassWord)
        {
            Result res = new Result();
            DataTable dt = SqlUtils.Read("select Power,Name,Id from UserInfoSet where UserName='"+UserName+"' and Password='"+PassWord+"'");
            if(dt.Rows.Count==0||dt==null)
            {
                res.errCode = "-1";
                res.errMsg = "用户名或密码错误";
            }
            else
            {
                res.errCode = "0";
                HttpContext.Current.Session["adminDataId"] = dt.Rows[0][2].ToString();
                HttpContext.Current.Session["adminId"] = UserName;
                HttpContext.Current.Session["adminName"] = dt.Rows[0][1].ToString();
                HttpContext.Current.Session["adminPower"] = dt.Rows[0][0].ToString();
                Log.writeLog(dt.Rows[0][2].ToString(),"成功登陆系统");
            }
            return JsonConvert.SerializeObject(res);
        }

        public static string getUserList()
        {
            dtResult res = new dtResult();
            DataTable dt = SqlUtils.Read("select UserName,Name,Tel from UserInfoSet where Valid=1");
            res.errCode = "0";
            res.data = dt;
            return JsonConvert.SerializeObject(res);
        }

        public static string addUser(string UserName, string Name, string Tel)
        {
            Result res = new Result();
            if(SqlUtils.COM("insert UserInfoSet(UserName,Name,Tel) values ('"+UserName+"',N'"+Name+"','"+Tel+"')")>0)
            {
                res.errCode = "0";

                Log.writeLog(HttpContext.Current.Session["adminDataId"].ToString(), "添加用户，用户名为：" + UserName + "，姓名为：" + Name);
            }
            else
            {
                res.errCode = "-1";
                res.errMsg = "添加失败，请重试！";
            }
            return JsonConvert.SerializeObject(res);
        }

        public static string delUser(string UserName)
        {
            Result res = new Result();
            if (SqlUtils.COM("Update UserInfoSet set Valid=0 where UserName='"+UserName+"'") > 0)
            {
                res.errCode = "0";
                Log.writeLog(HttpContext.Current.Session["adminDataId"].ToString(), "删除用户，用户名为：" + UserName);
            }
            else
            {
                res.errCode = "-1";
                res.errMsg = "删除失败，请重试！";
            }
            return JsonConvert.SerializeObject(res);
        }

        public static string changePass(string UserName, string Password)
        {
            Result res = new Result();
            if (SqlUtils.COM("Update UserInfoSet set Password='"+Password+"' where UserName='" + UserName + "'") > 0)
            {
                res.errCode = "0";
            }
            else
            {
                res.errCode = "-1";
                res.errMsg = "修改失败，请重试！";
            }
            return JsonConvert.SerializeObject(res);
        }

        public static string getPower()
        {
            dtResult res = new dtResult();
            DataTable dt = SqlUtils.Read("select UserName,Name,Tel from UserInfoSet where Valid=1 and Power<>0");
            res.errCode = "0";
            res.data = dt;
            return JsonConvert.SerializeObject(res);
        }

        public static string addPower(string UserName)
        {
            Result res = new Result();
            if (SqlUtils.COM("update UserInfoSet set Power=1 where UserName='"+UserName+"' and Valid=1") > 0)
            {
                res.errCode = "0";

                Log.writeLog(HttpContext.Current.Session["adminDataId"].ToString(), "添加管理员，用户名为：" + UserName);
            }
            else
            {
                res.errCode = "-1";
                res.errMsg = "添加失败，请重试！";
            }
            return JsonConvert.SerializeObject(res);
        }

        public static string delPower(string UserName)
        {
            Result res = new Result();
            if (SqlUtils.COM("Update UserInfoSet set Power=0 where UserName='" + UserName + "'") > 0)
            {
                res.errCode = "0";
                Log.writeLog(HttpContext.Current.Session["adminDataId"].ToString(), "删除管理员，用户名为：" + UserName);
            }
            else
            {
                res.errCode = "-1";
                res.errMsg = "删除失败，请重试！";
            }
            return JsonConvert.SerializeObject(res);
        }
    }
}