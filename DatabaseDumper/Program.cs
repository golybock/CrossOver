using System.Diagnostics;

string postgresqlVersion = "16";

var path_pg_dump = $" \"C:\\Program files\\PostgreSQL\\{postgresqlVersion}\\bin\\pg_dump.exe\" ";
var connection_string = "\"host=146.190.29.77 port=5432 dbname=cross_over user=admin password=admin\"";
var filename = $"\"C:\\Users\\{Environment.UserName}\\backup_{DateTime.Now.Ticks}.db\"";

string query = $"/c \"{path_pg_dump} {connection_string} > {filename}\"";

while (true)
{
	Console.WriteLine("start backup");
	var process = new ProcessStartInfo();
	process.FileName = "cmd.exe";
	process.Arguments = query;

	var pr = new Process();
	pr.StartInfo = process;
	pr.Start();

	pr.WaitForExit();

	Console.WriteLine("backup finally");

	Thread.Sleep(TimeSpan.FromDays(1));
}