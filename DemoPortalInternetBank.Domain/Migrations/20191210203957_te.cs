using Microsoft.EntityFrameworkCore.Migrations;

namespace DemoPortalInternetBank.Domain.Migrations
{
    public partial class te : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payment_Respondents_RespondentId",
                table: "Payment");

            migrationBuilder.RenameColumn(
                name: "RespondentId",
                table: "Payment",
                newName: "AccountId");

            migrationBuilder.RenameIndex(
                name: "IX_Payment_RespondentId",
                table: "Payment",
                newName: "IX_Payment_AccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payment_Accounts_AccountId",
                table: "Payment",
                column: "AccountId",
                principalTable: "Accounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payment_Accounts_AccountId",
                table: "Payment");

            migrationBuilder.RenameColumn(
                name: "AccountId",
                table: "Payment",
                newName: "RespondentId");

            migrationBuilder.RenameIndex(
                name: "IX_Payment_AccountId",
                table: "Payment",
                newName: "IX_Payment_RespondentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payment_Respondents_RespondentId",
                table: "Payment",
                column: "RespondentId",
                principalTable: "Respondents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
