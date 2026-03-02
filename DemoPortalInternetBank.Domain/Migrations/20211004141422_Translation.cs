using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DemoPortalInternetBank.Domain.Migrations
{
    public partial class Translation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Respondents");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Banks");

            migrationBuilder.AddColumn<int>(
                name: "TranslationId",
                table: "Respondents",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TranslationId",
                table: "Banks",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Translations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Ru = table.Column<string>(nullable: true),
                    En = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Translations", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Respondents_TranslationId",
                table: "Respondents",
                column: "TranslationId");

            migrationBuilder.CreateIndex(
                name: "IX_Banks_TranslationId",
                table: "Banks",
                column: "TranslationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Banks_Translations_TranslationId",
                table: "Banks",
                column: "TranslationId",
                principalTable: "Translations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Respondents_Translations_TranslationId",
                table: "Respondents",
                column: "TranslationId",
                principalTable: "Translations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Banks_Translations_TranslationId",
                table: "Banks");

            migrationBuilder.DropForeignKey(
                name: "FK_Respondents_Translations_TranslationId",
                table: "Respondents");

            migrationBuilder.DropTable(
                name: "Translations");

            migrationBuilder.DropIndex(
                name: "IX_Respondents_TranslationId",
                table: "Respondents");

            migrationBuilder.DropIndex(
                name: "IX_Banks_TranslationId",
                table: "Banks");

            migrationBuilder.DropColumn(
                name: "TranslationId",
                table: "Respondents");

            migrationBuilder.DropColumn(
                name: "TranslationId",
                table: "Banks");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Respondents",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Banks",
                nullable: true);
        }
    }
}
