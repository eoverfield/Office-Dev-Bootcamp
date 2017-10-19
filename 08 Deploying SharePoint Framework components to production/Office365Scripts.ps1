$creds = Get-Credential 
Connect-SPOService -Url https://sharepointknight-admin.sharepoint.com/ -Credential $creds

Set-SPOTenant -PublicCdnEnabled $true

Set-SPOTenant -PublicCdnAllowedFileTypes "CSS,EOT,GIF,ICO,JPEG,JPG,JS,MAP,PNG,SVG,TTF,WOFF,TXT"

New-SPOPublicCdnOrigin -Url "https://sharepointknight.sharepoint.com/sites/dev/siteassets/cdn"

Get-SPOPublicCdnOrigins