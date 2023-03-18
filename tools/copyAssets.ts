import * as shell from "shelljs";

// Copy all config and files
shell.cp("-R", "public", "dist/");
shell.cp("-R", "config", "dist/");
