create schema dbo
go

create table UserInfoSet
(
	Id int identity
		constraint PK_UserInfoSet
			primary key,
	UserName nvarchar(max) not null,
	Name nvarchar(max) not null,
	Tel nvarchar(max) not null,
	Password nvarchar(max) constraint UserInfoSet_Password_default default 111111 not null,
	Power smallint constraint UserInfoSet_Power_default default 0 not null,
	Valid bit default 1 not null
)
go

create table LogListSet
(
	Id int identity
		constraint PK_LogListSet
			primary key,
	Affair nvarchar(max) not null,
	Time datetime not null,
	UserInfo_Id int not null
		constraint FK_UserInfoLogList
			references UserInfoSet
)
go

create index IX_FK_UserInfoLogList
	on LogListSet (UserInfo_Id)
go

create table SectionListSet
(
	Id int identity
		constraint PK_SectionListSet
			primary key,
	sectionName nvarchar(max) not null,
	Valid bit default 1 not null
)
go

create table DataListSet
(
	Id int identity
		constraint PK_DataListSet
			primary key,
	startTime datetime not null,
	endTime datetime not null,
	Num int not null,
	SectionList_Id int not null
		constraint FK_DataListSectionList
			references SectionListSet
)
go

create index IX_FK_DataListSectionList
	on DataListSet (SectionList_Id)
go

