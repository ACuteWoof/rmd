# A simple markdown reader

This site lets you read markdown files directly from the web since web browsers apparently don't render markdown.

## Usage

You can open the reader for a markdown file by adding its URL as follows:

`https://rmd.lewoof.xyz/?url=<LINK TO YOUR MARKDOWN FILE>`

If the link to your markdown file needs certain parameters in order to be displayed, [encode the URL](https://www.urlencoder.io/) before pasting it.

---

The options listed below can be toggled on and of with the little menu that pops up when you click the gear icon on the top right corner.

![Options menu](https://rmd.lewoof.xyz/options.png)

### Hiding the header

`noheader`

Add `&noheader=true` to the URL to hide the header. Removing this parameter will show the header.

### Server side rendering

`nossr`

I use server side rendering to reduce loading times and to be compatible with browsers that don't use JavaScript. However, if you want to turn it off (to convert the markdown file to HTML on your client) in case the file you're opening is constantly updated and our server cache isn't updated quite as often, add `&nossr=true` to the URL.

### HTML embedding

`html`

If your markdown file contains HTML (like in some Github readmes), you can add `&html=true` to enable HTML rendering.

If HTML is present in a markdown file and HTML embedding is disabled, the HTML in the file will not only not be rendered, but it won't be displayed as text either.

https://rmd.lewoof.xyz/html.mp4

> [!CAUTION]
> Enable this at your own risk, since malicious code can be injected to the session through HTML.

## Project TODO

- [] Save as PDF (identical to what's seen on the screen)
- [] Compile to LaTeX

## Me :)

This is a simple project but if you found it helpful, you could check out more [about me](https://rmd.lewoof.xyz/?url=https://raw.githubusercontent.com/ACuteWoof/ACuteWoof/refs/heads/main/README.md&html=true), and maybe support me if you see fit. :P

- Solana: JDkK2kpBmPm6YyYnLYNHpw8FhKyZ9AQ2CQTqj6BQxFKY
- Bitcoin (native segwit): bc1qh5m8v9xyd8l4yc7d3qfs5a83rqk3eukcjlw6sh
- Buymeacoffee: [acutewoof](https://buymeacoffee.com/acutewoof)
