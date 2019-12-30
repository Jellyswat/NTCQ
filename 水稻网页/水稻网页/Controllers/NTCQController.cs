using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using 水稻网页.utils.NTCQ;

namespace 水稻网页.Controllers
{
    public class NTCQController : Controller
    {
        // GET: SDFS
        public ActionResult Index()
        {
            Session["adminDataId"] = null;
            Session["adminId"] = null;
            Session["adminName"] = null;
            Session["adminPower"] = null;
            return View();
        }

        public ActionResult Admin()
        {
            return View();
        }

        public ActionResult UserList()
        {
            return View();
        }

        public ActionResult Power()
        {
            return View();
        }

        public ActionResult LogList()
        {
            return View();
        }

        public ActionResult SectionList()
        {
            return View();
        }

        public ActionResult DataList()
        {
            return View();
        }

        public string doLogin()
        {
            string UserName = Request.Form["userName"];
            string PassWord = Request.Form["pwd"];
            return personal.doLogin(UserName, PassWord);
        }

        public string getUserList()
        {
            return personal.getUserList();
        }

        public string addUser(string UserName, string Name, string Tel)
        {
            return personal.addUser(UserName, Name, Tel);
        }

        public string delUser(string UserName)
        {
            return personal.delUser(UserName);
        }

        public string changePass(string UserName,string Password)
        {
            return personal.changePass(UserName, Password);
        }

        public string getPower()
        {
            return personal.getPower();
        }

        public string addPower(string UserName)
        {
            return personal.addPower(UserName);
        }

        public string delPower(string UserName)
        {
            return personal.delPower(UserName);
        }

        public string getLog()
        {
            return Log.getLog();
        }

        public string getSection()
        {
            return Section.getSection();
        }

        public string addSection(string sectionName)
        {
            return Section.addSection(sectionName);
        }

        public string delSection(string sectionId)
        {
            return Section.delSection(sectionId);
        }

        public string getData()
        {
            return Data.getData();
        }

        public string DataTimeNum(string start,string end)
        {
            return Data.DataTimeNum(start,end);
        }

        public string exportData()
        {
            return Data.exportData();
        }

    }
}