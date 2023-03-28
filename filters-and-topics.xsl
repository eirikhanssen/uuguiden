<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="3.0">
    
    <xsl:output method="html" omit-xml-declaration="yes"/>
    <xsl:strip-space elements="*"/>
    
    <xsl:mode on-no-match="shallow-copy"/>
    
    <xsl:variable name="version" select="'4.0b14'"/>
    
    <xsl:template match="/">
        <html lang="no" id="top">
            <head>
               <title>uuguiden.no | tilpasset veiledning for universell utforming av digitalt innhold</title>
                <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
                <link rel="stylesheet" href="{concat('css/uuguiden.css?v=', $version)}"/>
                <link rel="stylesheet" href="{concat('css/debug.css?v=', $version)}"/>
                <script src="{concat('js/uuguiden.js?v=', $version)}"></script> 
            </head>
            <body data-filter-main="show-all">
                <header id="header">
                    <div class="headercontent">
                        <h1>uuguiden.no</h1>
                        <p>Tilpasset veileder for universell utforming av digitalt innhold.</p>
                    </div>
                </header>
                <a id="skiplink" class="skiplink" href="#contents">Hopp over tilpasningsalternativer og gå til innholdsfortegnelsen</a>
                
                <section>
                    <fieldset id="filter-main">
                        <legend><h2>Hvordan vil du bruke veilederen?</h2></legend>
                        
                        <ol class="intro">
                            <li><label for="open-filter-button">Tilpass veilederen – basert på det du jobber med nå (mindre å lese)</label></li>
                            <li><label for="show-all-content-button">Se hele veilederen – bruk innholdsfortegnelsen som et oppslagsverk</label></li>
                        </ol>
                        
                        <menu class="introbuttons fh">
                            <li><button id="open-filter-button">Jeg vil tilpasse veilederen</button></li>
                            <li><button id="show-all-content-button">Jeg vil se hele veilederen</button></li>
                        </menu>
                        
                    </fieldset>
                    <xsl:comment>#filter-main</xsl:comment>
                    
                    <xsl:apply-templates select="/filters-and-topics/filters"/>
                    
                </section>
                <xsl:comment>#customize</xsl:comment>
                <main>
                    <section id="contents" tabindex="-1">
                        <h2 id="contents-heading">På denne siden <span class="filtered">(tilpasset)</span></h2>
                        <div id="permalink-container"></div>
                        <p class="filtered">Basert på dine valg anbefales du å sjekke følgende tema:</p>
                        <nav id="guide-toc"></nav>
                        <xsl:comment>#guide-toc skal bli generert av JS</xsl:comment>
                        
                        <xsl:apply-templates select="/filters-and-topics/topics"/>
                    </section>                    
                    
                </main>
                <footer id="footer">
                    <h2>Feedback</h2>
                    <p>Hvis du vil legge igjen feedback kan du svare på <a href="https://nettskjema.no/a/317600">et kort spørreskjema om uuguiden (nettskjema.no)</a></p>
                </footer>
                <a class="show" href="#top" title="Gå til toppen av siden">Topp</a>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="filters">
        <details id="customize">
            <summary><h2>Hva jobber du med nå?</h2></summary>

            <p class="info">Få anbefalinger basert på det du jobber med nå. Hvis du krysser av og aktiverer innstillingene får du en forkortet og tilpasset veileder.</p>
    
            <menu class="filterbuttons fh">
                <li><button id="confirm-choices-button-top">Aktiver innstillinger</button></li>  
                <li><button id="reset-filter-button-top">Ta vekk avkrysninger</button></li>
            </menu>

            <div id="filters">
                <xsl:apply-templates/>    
            </div>
            
            <menu class="filterbuttons fh">
                <li><button id="confirm-choices-button-bottom">Aktiver filter</button></li>  
                <li><button id="reset-filter-button-bottom">Ta vekk avkrysninger</button></li>
            </menu>
            
        </details>
    </xsl:template>
    
    <xsl:template match="filter">
        
        <xsl:variable name="fieldset_prefix" select="'filter-'"/>
        <li>
            <label>
                <input id="{concat($fieldset_prefix,@topic)}" type="checkbox">
                    <xsl:choose>
                        <xsl:when test="@topic">
                            <xsl:attribute name="id" select="concat($fieldset_prefix,'topic-',@topic)"/>
                        </xsl:when>
                        <xsl:when test="@app">
                            <xsl:attribute name="id" select="concat($fieldset_prefix,'app-',@app)"/>
                        </xsl:when>
                        <xsl:otherwise/>
                    </xsl:choose>
                    
                    <xsl:variable name="this" select="."/>
                    <xsl:choose>
                        <xsl:when test="parent::filter-group[@parent] and @parent">
                            <xsl:attribute name="data-parent" select="concat($fieldset_prefix, parent::filter-group/@parent), ' ' , @parent"/>
                        </xsl:when>
                        <xsl:when test="parent::filter-group[@parent]">
                            <xsl:attribute name="data-parent" select="concat($fieldset_prefix, parent::filter-group/@parent)"/>
                        </xsl:when>
                        <xsl:when test="@parent">
                            <xsl:attribute name="data-parent" select="concat($fieldset_prefix,@parent)"/>
                        </xsl:when>
                        <xsl:otherwise/>
                    </xsl:choose>
                    <xsl:if test="parent::filter-group[@parent] and @parent">
                        <xsl:attribute name="data-parent" select="concat($fieldset_prefix, parent::filter-group/@parent)"/>
                    </xsl:if>
                    <xsl:if test="@topic">
                        <xsl:attribute name="data-topic" select="@topic"/>
                    </xsl:if>
                    <xsl:if test="@app">
                        <xsl:attribute name="data-app" select="@app"/>
                    </xsl:if>
                    <xsl:if test="@topic = ../filter-group/@parent">
                        <xsl:variable name="current_topic" select="@topic"/>
                        <xsl:variable name="children" select="../filter-group[@parent=$current_topic]/filter"/>
                        <xsl:variable name="children_string" select="string-join(($children/@topic), ';')"/>
                        <xsl:variable name="filter_children_string">
                            <xsl:analyze-string select="$children_string" regex=";">
                                <xsl:matching-substring><xsl:text> </xsl:text></xsl:matching-substring>
                                <xsl:non-matching-substring><xsl:value-of select="concat($fieldset_prefix, .)"/></xsl:non-matching-substring>
                            </xsl:analyze-string>
                        </xsl:variable>
                        <xsl:attribute name="data-children" select="$filter_children_string"></xsl:attribute>
                    </xsl:if>
                </input><span><xsl:value-of select="text()[1]"/></span></label>
            <xsl:apply-templates select="filter-group"/>
        </li>
    </xsl:template>
    
    <xsl:template match="filter-group">
        <ul><xsl:apply-templates/></ul>
    </xsl:template>
    
    <xsl:template match="fieldset">
        <fieldset id="{concat('filter-',@prefix)}">
            <legend><xsl:value-of select="@legend"/></legend>
            <xsl:apply-templates/>
        </fieldset>
    </xsl:template>
    
    <xsl:template match="fieldset/button">
        <button id="{concat('confirm-choices-',ancestor::fieldset/@prefix)}">
            <xsl:apply-templates/>
        </button>
    </xsl:template>
    
    <xsl:template match="topics">
        <div id="topics">
            <xsl:apply-templates/>    
        </div><xsl:comment>#topics</xsl:comment>
    </xsl:template>
    
    <xsl:template match="topic">
        <article>
            <xsl:apply-templates select="@*|node()"/>
        </article>
    </xsl:template>
    
    <xsl:template match="topic/title">
        <h2><xsl:value-of select="."/></h2>
    </xsl:template>
    
    <xsl:template match="topic/sec/title">
        <h3><xsl:value-of select="."/></h3>
    </xsl:template>
    
    <xsl:template match="topic/sec/sec/title">
        <h4><xsl:value-of select="."/></h4>
    </xsl:template>
    
    <xsl:template match="general">
        <div class="general">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="@rel">
        <xsl:attribute name="data-rel" select="."/>
    </xsl:template>
    
    <xsl:template match="@app">
        <xsl:attribute name="data-app" select="."/>
    </xsl:template>
    
    <xsl:template match="topic/@id">
        <xsl:attribute name="id" select="concat('topic-', .)"></xsl:attribute>
    </xsl:template>
    
    <xsl:template match="topic/sec/@id">
        <xsl:attribute name="id" select="concat('topic-', ../../@id, '-', .)"></xsl:attribute>
    </xsl:template>
    
    <xsl:template match="topic/sec">
        <section>
            <xsl:apply-templates select="@*|node()"/>
        </section>
    </xsl:template>
    
    <xsl:template match="table/caption">
        <xsl:variable name="table_number" select="count(preceding::table)+1"/>
        <xsl:copy>
            <header>Tabell <xsl:value-of select="$table_number"/></header>
            <p><xsl:apply-templates/></p>
        </xsl:copy>
    </xsl:template>
    
</xsl:stylesheet>