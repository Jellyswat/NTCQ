using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace 水稻网页.utils.NTCQ
{
    public class Result
    {
        public string errCode { get; set; }
        public string errMsg { get; set; }

    }

    public class dtResult
    {
        public string errCode { get; set; }
        public string errMsg { get; set; }
        public DataTable data { get; set; }

    }
}