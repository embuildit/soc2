#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class SitemapGenerator {
    constructor() {
        this.baseUrl = 'https://soc2certification.com';
        this.sitemapPath = './sitemap.xml';
        this.blogDir = './blog';
    }

    generateSitemap() {
        const urls = [];

        // Add main pages
        urls.push({
            loc: this.baseUrl + '/',
            lastmod: this.formatDate(new Date()),
            changefreq: 'weekly',
            priority: '1.0'
        });

        const mainPages = ['blog.html', 'contact.html', 'privacy.html', 'terms.html'];
        mainPages.forEach(page => {
            const filePath = `./${page}`;
            const stats = fs.existsSync(filePath) ? fs.statSync(filePath) : null;
            
            urls.push({
                loc: this.baseUrl + '/' + page,
                lastmod: this.formatDate(stats ? stats.mtime : new Date()),
                changefreq: page === 'blog.html' ? 'weekly' : (page.includes('privacy') || page.includes('terms') ? 'yearly' : 'monthly'),
                priority: page === 'blog.html' ? '0.8' : '0.6'
            });
        });

        // Add blog posts
        if (fs.existsSync(this.blogDir)) {
            const blogFiles = fs.readdirSync(this.blogDir)
                .filter(file => file.endsWith('.html'))
                .sort();

            blogFiles.forEach(file => {
                const filePath = path.join(this.blogDir, file);
                const stats = fs.statSync(filePath);
                
                urls.push({
                    loc: this.baseUrl + '/blog/' + file,
                    lastmod: this.formatDate(stats.mtime),
                    changefreq: 'monthly',
                    priority: '0.7'
                });
            });
        }

        // Generate XML
        const xml = this.generateXML(urls);
        fs.writeFileSync(this.sitemapPath, xml);
        
        console.log(`Sitemap generated with ${urls.length} URLs`);
        console.log(`Blog posts found: ${urls.filter(u => u.loc.includes('/blog/')).length}`);
    }

    generateXML(urls) {
        const header = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        const footer = '</urlset>';
        
        const urlElements = urls.map(url => {
            return `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
        }).join('\n');

        return `${header}\n${urlElements}\n${footer}\n`;
    }

    formatDate(date) {
        return date.toISOString().split('T')[0];
    }
}

// Run if called directly
if (require.main === module) {
    const generator = new SitemapGenerator();
    generator.generateSitemap();
}

module.exports = SitemapGenerator;