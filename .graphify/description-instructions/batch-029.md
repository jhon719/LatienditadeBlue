# Node Description Batch 30 of 30

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For a code symbol (kind=code-symbol — a function, class, or constant),
describe what the function/symbol does based on its name, source location
and neighbors — e.g. "Resolves the configured ontology profile from graphify.yaml.".
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "ui_dialog_dialogdescription": "DialogDescription()" | kind=code-symbol | source=src/components/ui/dialog.tsx:L119 | neighbors=[dialog.tsx]
- "ui_dialog_dialogfooter": "DialogFooter()" | kind=code-symbol | source=src/components/ui/dialog.tsx:L93 | neighbors=[dialog.tsx]
- "ui_dialog_dialogheader": "DialogHeader()" | kind=code-symbol | source=src/components/ui/dialog.tsx:L83 | neighbors=[dialog.tsx]
- "ui_dialog_dialogoverlay": "DialogOverlay()" | kind=code-symbol | source=src/components/ui/dialog.tsx:L33 | neighbors=[dialog.tsx]
- "ui_dialog_dialogportal": "DialogPortal()" | kind=code-symbol | source=src/components/ui/dialog.tsx:L21 | neighbors=[dialog.tsx]
- "ui_dialog_dialogtrigger": "DialogTrigger()" | kind=code-symbol | source=src/components/ui/dialog.tsx:L15 | neighbors=[dialog.tsx]
- "ui_dropdown_menu_dropdownmenucheckboxitem": "DropdownMenuCheckboxItem()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L85 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenugroup": "DropdownMenuGroup()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L54 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenuportal": "DropdownMenuPortal()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L15 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenuradiogroup": "DropdownMenuRadioGroup()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L111 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenuradioitem": "DropdownMenuRadioItem()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L122 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenushortcut": "DropdownMenuShortcut()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L179 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenusub": "DropdownMenuSub()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L195 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenusubcontent": "DropdownMenuSubContent()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L225 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenusubtrigger": "DropdownMenuSubTrigger()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L201 | neighbors=[dropdown-menu.tsx]
- "ui_select_selectgroup": "SelectGroup()" | kind=code-symbol | source=src/components/ui/select.tsx:L15 | neighbors=[select.tsx]
- "ui_select_selectlabel": "SelectLabel()" | kind=code-symbol | source=src/components/ui/select.tsx:L90 | neighbors=[select.tsx]
- "ui_select_selectscrolldownbutton": "SelectScrollDownButton()" | kind=code-symbol | source=src/components/ui/select.tsx:L161 | neighbors=[select.tsx]
- "ui_select_selectscrollupbutton": "SelectScrollUpButton()" | kind=code-symbol | source=src/components/ui/select.tsx:L143 | neighbors=[select.tsx]
- "ui_select_selectseparator": "SelectSeparator()" | kind=code-symbol | source=src/components/ui/select.tsx:L130 | neighbors=[select.tsx]
- "ui_sheet_sheetclose": "SheetClose()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L19 | neighbors=[sheet.tsx]
- "ui_sheet_sheetdescription": "SheetDescription()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L117 | neighbors=[sheet.tsx]
- "ui_sheet_sheetfooter": "SheetFooter()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L94 | neighbors=[sheet.tsx]
- "ui_sheet_sheetoverlay": "SheetOverlay()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L31 | neighbors=[sheet.tsx]
- "ui_sheet_sheetportal": "SheetPortal()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L25 | neighbors=[sheet.tsx]
- "ui_table_tablecaption": "TableCaption()" | kind=code-symbol | source=src/components/ui/table.tsx:L94 | neighbors=[table.tsx]
- "ui_table_tablefooter": "TableFooter()" | kind=code-symbol | source=src/components/ui/table.tsx:L42 | neighbors=[table.tsx]
- "upload_route_admin_folders": "ADMIN_FOLDERS" | kind=code-symbol | source=src/app/api/upload/route.ts:L15 | neighbors=[route.ts]
- "upload_route_delete": "DELETE()" | kind=code-symbol | source=src/app/api/upload/route.ts:L117 | neighbors=[route.ts]
- "upload_route_post": "POST()" | kind=code-symbol | source=src/app/api/upload/route.ts:L24 | neighbors=[route.ts]
- "upload_route_user_folders": "USER_FOLDERS" | kind=code-symbol | source=src/app/api/upload/route.ts:L14 | neighbors=[route.ts]
- "users_page_adminuser": "AdminUser" | kind=code-symbol | source=src/app/(admin-panel)/admin/users/page.tsx:L31 | neighbors=[page.tsx]
- "users_page_adminuserspage": "AdminUsersPage()" | kind=code-symbol | source=src/app/(admin-panel)/admin/users/page.tsx:L51 | neighbors=[page.tsx]
- "users_route_get": "GET()" | kind=code-symbol | source=src/app/api/users/route.ts:L7 | neighbors=[route.ts]
- "validate_route_post": "POST()" | kind=code-symbol | source=src/app/api/coupons/validate/route.ts:L13 | neighbors=[route.ts]
- "validate_route_schema": "schema" | kind=code-symbol | source=src/app/api/coupons/validate/route.ts:L6 | neighbors=[route.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-029.json

Keep each description factual and concise (one sentence). No markdown, no prose
outside the JSON object. It is acceptable to omit a node if context is
insufficient — but include every node you can ground confidently.

Example answer format:
```json
{
  "node_id_1": "Resolves the configured ontology profile from graphify.yaml.",
  "node_id_2": "Colonel James Barclay, an antagonist in The Crooked Man."
}
```
