using System;
using System.Data;
using System.Data.SqlClient;

public class SqlUtils
{
    public static DataTable Read(string com)
    {
        SqlConnection conn = new SqlConnection(System.Configuration.ConfigurationManager.AppSettings["connectionString"]);
        conn.Open();
        SqlDataAdapter sqlData = new SqlDataAdapter(com, conn);
        DataTable dt = new DataTable();
        sqlData.Fill(dt);
        conn.Close();
        return dt;
    }

    public static int COM(string com)
    {
        SqlConnection conn = new SqlConnection(System.Configuration.ConfigurationManager.AppSettings["connectionString"]);
        try
        {
            conn.Open();
            SqlCommand comm = new SqlCommand(com, conn);
            int flag = comm.ExecuteNonQuery();
            conn.Close();
            return flag;
        }
        catch (Exception ex)
        {
            conn.Close();
            return 0;
        }
    }


}