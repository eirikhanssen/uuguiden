<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="3.0">
    
    <xsl:output method="html" omit-xml-declaration="yes"/>
    <xsl:strip-space elements="*"/>
    
    <xsl:mode on-no-match="shallow-copy"/>
    
    <xsl:template match="filter">
        <li>
            <label>
                <input id="{concat('filter-',ancestor::fieldset/@prefix,'-',@topic)}" type="checkbox">
                    <xsl:if test="parent::filter-group[@parent]">
                        <xsl:attribute name="data-parent" select="concat('filter-',ancestor::fieldset/@prefix,'-', parent::filter-group/@parent)"/>
                    </xsl:if>
                    <xsl:if test="@topic">
                        <xsl:attribute name="data-topic" select="@topic"/>
                    </xsl:if>
                </input><span><xsl:value-of select="."/></span></label>
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
    
    <xsl:template match="filters">
        <nav>
            <h2>Filter</h2>
            <xsl:apply-templates/>
        </nav>
    </xsl:template>
    
    <xsl:template match="button">
        <button id="{concat('confirm-choices-',ancestor::fieldset/@prefix)}">
            <xsl:apply-templates/>
        </button>
    </xsl:template>
    
</xsl:stylesheet>