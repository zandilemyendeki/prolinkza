import jsPDF from 'jspdf';
import type { Template } from '../types/resume';

interface PersonalInfo {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    linkedIn: string;
    portfolio: string;
    summary: string;
}

interface Education {
    id: string;
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    achievements: string;
}

interface Experience {
    id: string;
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    responsibilities: string;
}

interface Skill {
    id: string;
    category: string;
    items: string;
}

interface ResumeData {
    personal: PersonalInfo;
    education: Education[];
    experience: Experience[];
    skills: Skill[];
}

const TEMPLATE_COLORS = {
    nala: '#7a1f2b',
    master: '#1a4fbf',
    modern: '#1D9E75',
    professional: '#34586bff',
    'two-column': '#534AB7',
    minimal: '#909033ff',
    creative: '#993C1D',
    classic: '#000000',
    wozber: '#7dd8cfff',
    sofaa: '#E6E6E6',
};

function hexToRgb(hex: string): [number, number, number] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16),
        ]
        : [0, 0, 0];
}

// Helper to format date range
function formatDateRange(start: string, end: string, current: boolean): string {
    const formatDate = (dateStr: string) => {
        if (!dateStr || !dateStr.trim()) return '';

        const parts = dateStr.split('-');

        // Case 1: Only year (e.g. "2023")
        if (parts.length === 1) {
            return parts[0];
        }

        // Case 2: Year + month (e.g. "2023-07")
        const [year, month] = parts;
        const monthNum = parseInt(month, 10);

        if (!isNaN(monthNum) && monthNum >= 1 && monthNum <= 12) {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return `${months[monthNum - 1]} ${year}`;
        }

        // Fallback (if weird format)
        return dateStr;
    };

    const startFormatted = formatDate(start);
    const endFormatted = current ? 'Present' : formatDate(end);

    if (!startFormatted && !endFormatted) return '';
    if (!startFormatted) return endFormatted;
    if (!endFormatted) return startFormatted;

    return `${startFormatted} - ${endFormatted}`;
}

// Helper to wrap text
function wrapText(doc: jsPDF, text: string, maxWidth: number): string[] {
    const lines: string[] = [];
    const paragraphs = text.split('\n');

    paragraphs.forEach(paragraph => {
        if (!paragraph.trim()) {
            lines.push('');
            return;
        }

        const words = paragraph.split(' ');
        let currentLine = '';

        words.forEach(word => {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            const width = doc.getTextWidth(testLine);

            if (width > maxWidth && currentLine) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        });

        if (currentLine) {
            lines.push(currentLine);
        }
    });

    return lines;
}

export function generatePDF(data: ResumeData, template: Template): void {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
    });

    // const accentColor = TEMPLATE_COLORS[template];
    const accentColor = TEMPLATE_COLORS[template] || '#000000';
    const [r, g, b] = hexToRgb(accentColor);

    if (template === 'two-column') {
        generateTwoColumnPDF(doc, data, r, g, b);
    } else if (template === 'classic') {
        generateClassicPDF(doc, data);
    } else if (template === 'wozber') {
        generateWozberPDF(doc, data);
    } else if (template === 'sofaa') {
        generateSofaaPDF(doc, data);
    } else if (template === 'professional') {
        generateProfessionalPDF(doc, data);
    } else if (template === 'master') {
        generateMasterPDF(doc, data);
    } else if (template === 'creative') {
        generateCreativePDF(doc, data);
    } else if (template === 'minimal') {
        generateMinimalPDF(doc, data);
    } else if (template === 'nala') {
        generateNalaPDF(doc, data);
    } else {
        generateSingleColumnPDF(doc, data, r, g, b);
    }

    // Save the PDF
    const fileName = `${data.personal.fullName || 'Resume'}_CV.pdf`;
    doc.save(fileName);
}

function generateSingleColumnPDF(
    doc: jsPDF,
    data: ResumeData,
    r: number,
    g: number,
    b: number
): void {
    let yPos = 0;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    // Header section with colored background
    doc.setFillColor(r, g, b);
    doc.rect(0, 0, pageWidth, 45, 'F');

    // Name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(data.personal.fullName || 'Your Name', pageWidth / 2, 16, { align: 'center' });

    // Job Title
    if (data.personal.jobTitle) {
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text(data.personal.jobTitle, pageWidth / 2, 22, { align: 'center' });
    }

    // Contact info
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const contactLine1 = [
        data.personal.phone,
        data.personal.email,
        data.personal.location,
    ].filter(Boolean).join(' • ');

    if (contactLine1) {
        doc.text(contactLine1, pageWidth / 2, 28, { align: 'center' });
    }

    const contactLine2 = [
        data.personal.linkedIn,
        data.personal.portfolio,
    ].filter(Boolean).join(' • ');

    if (contactLine2) {
        doc.text(contactLine2, pageWidth / 2, 35, { align: 'center' });
    }

    yPos = 55;
    doc.setTextColor(0, 0, 0);

    if (data.personal.summary) {
        // Section heading
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(r, g, b);
        doc.text('PROFESSIONAL SUMMARY', margin, yPos);

        // Underline
        doc.setDrawColor(r, g, b);
        doc.setLineWidth(0.8);
        doc.line(margin, yPos + 2, pageWidth - margin, yPos + 2);

        yPos += 8;

        // Summary text
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(40, 40, 40);
        const summaryLines = wrapText(doc, data.personal.summary, contentWidth);
        summaryLines.forEach(line => {
            if (yPos > pageHeight - 20) {
                doc.addPage();
                yPos = 20;
            }
            doc.text(line, margin, yPos);
            yPos += 5;
        });

        yPos += 5;
    }

    // Work Experience
    if (data.experience.length > 0) {
        if (yPos > pageHeight - 30) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(r, g, b);
        doc.text('WORK EXPERIENCE', margin, yPos);

        doc.setDrawColor(r, g, b);
        doc.setLineWidth(0.8);
        doc.line(margin, yPos + 2, pageWidth - margin, yPos + 2);

        yPos += 10;

        data.experience.forEach((exp) => {
            if (yPos > pageHeight - 40) {
                doc.addPage();
                yPos = 20;
            }

            // Job title
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text(exp.jobTitle, margin, yPos);

            // Date range (only if dates exist)
            const dateRange = formatDateRange(exp.startDate, exp.endDate, exp.current);
            if (dateRange) {
                doc.setFontSize(9);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(100, 100, 100);
                doc.text(dateRange, pageWidth - margin, yPos, { align: 'right' });
            }

            yPos += 5;

            // Company and location
            doc.setFontSize(10);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(80, 80, 80);
            const companyText = exp.location
                ? `${exp.company} | ${exp.location}`
                : exp.company;
            doc.text(companyText, margin, yPos);

            yPos += 6;

            // Responsibilities
            if (exp.responsibilities) {
                doc.setFontSize(9);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(60, 60, 60);
                const bulletPoints = exp.responsibilities.split('\n');

                bulletPoints.forEach(point => {
                    const trimmed = point.trim();
                    if (!trimmed) return;

                    const lines = wrapText(doc, trimmed, contentWidth - 5);

                    lines.forEach((line, index) => {
                        if (yPos > pageHeight - 20) {
                            doc.addPage();
                            yPos = 20;
                        }

                        if (index === 0) {
                            doc.text(`• ${line}`, margin, yPos);
                        } else {
                            doc.text(line, margin + 3, yPos);
                        }

                        yPos += 4.5;
                    });
                });
            }

            yPos += 5;
        });
    }

    // Education
    if (data.education.length > 0) {
        if (yPos > pageHeight - 30) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(r, g, b);
        doc.text('EDUCATION', margin, yPos);

        doc.setDrawColor(r, g, b);
        doc.setLineWidth(0.8);
        doc.line(margin, yPos + 2, pageWidth - margin, yPos + 2);

        yPos += 10;

        data.education.forEach(edu => {
            if (yPos > pageHeight - 30) {
                doc.addPage();
                yPos = 20;
            }

            // Degree
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text(edu.degree, margin, yPos);

            // Date range (only if dates exist)
            const dateRange = formatDateRange(edu.startDate, edu.endDate, edu.current);
            if (dateRange) {
                doc.setFontSize(9);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(100, 100, 100);
                doc.text(dateRange, pageWidth - margin, yPos, { align: 'right' });
            }

            yPos += 5;

            // Institution
            doc.setFontSize(10);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(80, 80, 80);
            const institutionText = edu.location
                ? `${edu.institution} | ${edu.location}`
                : edu.institution;
            doc.text(institutionText, margin, yPos);

            yPos += 5;

            // Achievements
            if (edu.achievements) {
                doc.setFontSize(9);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(60, 60, 60);
                const achievementLines = wrapText(doc, edu.achievements, contentWidth);
                achievementLines.forEach(line => {
                    if (yPos > pageHeight - 20) {
                        doc.addPage();
                        yPos = 20;
                    }
                    doc.text(line, margin, yPos);
                    yPos += 4.5;
                });
            }

            yPos += 5;
        });
    }

    // Skills
    if (data.skills.length > 0) {
        if (yPos > pageHeight - 30) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(r, g, b);
        doc.text('SKILLS', margin, yPos);

        doc.setDrawColor(r, g, b);
        doc.setLineWidth(0.8);
        doc.line(margin, yPos + 2, pageWidth - margin, yPos + 2);

        yPos += 10;

        data.skills.forEach(skill => {
            if (yPos > pageHeight - 20) {
                doc.addPage();
                yPos = 20;
            }

            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text(`${skill.category}:`, margin, yPos);

            doc.setFont('helvetica', 'normal');
            doc.setTextColor(60, 60, 60);
            const skillText = skill.items;
            const skillLines = wrapText(doc, skillText, contentWidth - 40);
            doc.text(skillLines[0], margin + 40, yPos);

            for (let i = 1; i < skillLines.length; i++) {
                yPos += 5;
                if (yPos > pageHeight - 20) {
                    doc.addPage();
                    yPos = 20;
                }
                doc.text(skillLines[i], margin + 40, yPos);
            }

            yPos += 6;
        });
    }
}

function drawEmailIcon(doc: jsPDF, x: number, y: number) {
    const top = y - 2.5;

    const w = 3.5;
    const h = 2.5;

    doc.rect(x, top, w, h);
    doc.line(x, top, x + w / 2, top + h * 0.6);
    doc.line(x + w, top, x + w / 2, top + h * 0.6);
}

function drawPhoneIcon(doc: jsPDF, x: number, y: number) {
    const top = y - 3;

    doc.line(x, top + 1, x + 1.5, top);
    doc.line(x + 1.5, top, x + 3.5, top + 2);
    doc.line(x + 3.5, top + 2, x + 2, top + 3);
    doc.line(x + 2, top + 3, x, top + 1);
}

function drawLocationIcon(doc: jsPDF, x: number, y: number) {
    const top = y - 3;

    doc.circle(x + 2.5, top + 1.5, 1.2);
    doc.line(x + 2.5, top + 2.7, x + 2.5, top + 4);
}

function drawLinkedInIcon(doc: jsPDF, x: number, y: number) {
    const top = y - 2.6;

    const size = 3.3;

    doc.rect(x, top, size, size);

    doc.setFontSize(8);
    doc.text('in', x + 0.7, y - 0.2);
}

function drawWebIcon(doc: jsPDF, x: number, y: number) {
    const top = y - 2.8;

    doc.circle(x + 2, top + 2, 2);

    doc.line(x + 0.5, top + 2, x + 3.5, top + 2);

    doc.line(x + 2, top + 0.5, x + 2, top + 3.5);

    doc.line(x + 1, top + 1, x + 3, top + 1);
    doc.line(x + 1, top + 3, x + 3, top + 3);
}

function generateProfessionalPDF(doc: jsPDF, data: ResumeData): void {
    let y = 20;

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    const checkPage = () => {
        if (y > 275) {
            doc.addPage();
            y = 20;
        }
    };

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(0, 0, 0);
    doc.text(data.personal.fullName || 'Your Name', margin, y);

    y += 7;

    if (data.personal.jobTitle) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(80, 80, 80);
        doc.text(data.personal.jobTitle, margin, y);
        y += 8;
    }

    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);

    const contactItems: string[] = [];

    if (data.personal.email) contactItems.push(`Email: ${data.personal.email}`);
    if (data.personal.phone) contactItems.push(`Phone: ${data.personal.phone}`);
    if (data.personal.location) contactItems.push(`Location: ${data.personal.location}`);
    if (data.personal.linkedIn) contactItems.push(`LinkedIn: ${data.personal.linkedIn}`);
    if (data.personal.portfolio) contactItems.push(`Portfolio: ${data.personal.portfolio}`);

    const iconX = margin;
    const textX = margin + 10;

    doc.setDrawColor(60, 60, 60);
    doc.setLineWidth(0.3);
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);

    const drawRow = (
        iconFn: (doc: jsPDF, x: number, y: number) => void,
        text: string
    ) => {
        iconFn(doc, iconX, y);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(60, 60, 60);

        doc.text(text, textX, y);

        y += 5;
    };

    if (data.personal.email) {
        drawRow(drawEmailIcon, data.personal.email);
    }

    if (data.personal.phone) {
        drawRow(drawPhoneIcon, data.personal.phone);
    }

    if (data.personal.location) {
        drawRow(drawLocationIcon, data.personal.location);
    }

    if (data.personal.linkedIn) {
        drawRow(drawLinkedInIcon, data.personal.linkedIn);
    }

    if (data.personal.portfolio) {
        drawRow(drawWebIcon, data.personal.portfolio);
    }

    y += 2;
    doc.setDrawColor(210, 210, 210);
    doc.setLineWidth(0.2);
    doc.line(margin, y, pageWidth - margin, y);

    y += 10;

    const section = (title: string) => {
        checkPage();

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(30, 30, 30);
        doc.text(title.toUpperCase(), margin, y);

        y += 2;

        doc.setDrawColor(210, 210, 210);
        doc.setLineWidth(0.2);
        doc.line(margin, y, pageWidth - margin, y);

        y += 6;
    };

    if (data.personal.summary) {
        section('Professional Summary');

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(50, 50, 50);

        wrapText(doc, data.personal.summary, contentWidth).forEach(line => {
            checkPage();
            doc.text(line, margin, y);
            y += 5;
        });

        y += 6;
    }

    if (data.experience.length > 0) {
        section('Professional Experience');

        data.experience.forEach(exp => {
            checkPage();

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.setTextColor(0, 0, 0);
            doc.text(exp.jobTitle, margin, y);

            const date = formatDateRange(exp.startDate, exp.endDate, exp.current);
            if (date) {
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                doc.setTextColor(120, 120, 120);
                doc.text(date, pageWidth - margin, y, { align: 'right' });
            }

            y += 5;

            doc.setFont('helvetica', 'italic');
            doc.setFontSize(10);
            doc.setTextColor(70, 70, 70);
            doc.text(
                exp.location ? `${exp.company} | ${exp.location}` : exp.company,
                margin,
                y
            );

            y += 5;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(50, 50, 50);

            exp.responsibilities.split('\n').forEach(point => {
                const clean = point.trim();
                if (!clean) return;

                const lines = wrapText(doc, clean, contentWidth - 5);

                lines.forEach((line, i) => {
                    checkPage();

                    if (i === 0) {
                        doc.text('•', margin, y);
                        doc.text(line, margin + 3, y);
                    } else {
                        doc.text(line, margin + 3, y);
                    }

                    y += 4.5;
                });
            });

            y += 6;
        });
    }

    if (data.education.length > 0) {
        section('Education');

        data.education.forEach(edu => {
            checkPage();

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.setTextColor(0, 0, 0);

            const degreeLines = doc.splitTextToSize(
                edu.degree,
                contentWidth - 30
            );

            doc.text(degreeLines, margin, y);

            const date = formatDateRange(
                edu.startDate,
                edu.endDate,
                edu.current
            );

            if (date) {
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                doc.setTextColor(120, 120, 120);

                doc.text(date, pageWidth - margin, y, {
                    align: 'right'
                });
            }

            y += degreeLines.length * 5;

            doc.setFont('helvetica', 'italic');
            doc.setFontSize(10);
            doc.setTextColor(70, 70, 70);

            const institutionText = edu.location
                ? `${edu.institution} | ${edu.location}`
                : edu.institution;

            const institutionLines = doc.splitTextToSize(
                institutionText,
                contentWidth
            );

            doc.text(institutionLines, margin, y);

            y += institutionLines.length * 4.5;

            if (edu.achievements) {
                y += 2;

                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                doc.setTextColor(90, 90, 90);

                const achievementLines = doc.splitTextToSize(
                    edu.achievements,
                    contentWidth
                );

                achievementLines.forEach((line: string) => {
                    checkPage();

                    doc.text(line, margin, y);
                    y += 4;
                });
            }

            y += 8;
        });
    }

    if (data.skills.length > 0) {
        section('Core Skills');

        doc.setFontSize(10);
        doc.setTextColor(50, 50, 50);

        data.skills.forEach(skill => {
            checkPage();

            const category = skill.category;
            const items = Array.isArray(skill.items)
                ? skill.items.join(', ')
                : skill.items;

            doc.setFont('helvetica', 'bold');
            const categoryText = `${category}:`;
            doc.text(categoryText, margin, y);

            const categoryWidth = doc.getTextWidth(categoryText) + 2;

            doc.setFont('helvetica', 'normal');
            const wrappedItems = doc.splitTextToSize(
                items,
                pageWidth - margin * 2 - categoryWidth
            );

            doc.text(wrappedItems, margin + categoryWidth, y);
            y += wrappedItems.length * 5 + 2;
        });

        y += 2;
    }
}

function generateNalaPDF(doc: jsPDF, data: ResumeData): void {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    const bottomMargin = 20;
    const maxY = pageHeight - bottomMargin;
    let y = 0;

    const hasSpace = (linesNeeded: number = 1) => {
        return y + (linesNeeded * 5) < maxY;
    };

    doc.setFillColor(122, 31, 43);
    doc.rect(0, 0, pageWidth, 8, 'F');

    y = 20;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(122, 31, 43);
    doc.text(data.personal.fullName || 'Your Name', margin, y);

    let contactY = y;
    doc.setFontSize(9);

    if (data.personal.phone) {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(122, 31, 43);
        doc.text('T', pageWidth - margin - 50, contactY);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(85, 85, 85);
        doc.text(data.personal.phone, pageWidth - margin - 45, contactY);
        contactY += 4;
    }

    if (data.personal.email) {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(122, 31, 43);
        doc.text('E', pageWidth - margin - 50, contactY);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(85, 85, 85);

        const emailLines = doc.splitTextToSize(data.personal.email, 45);
        emailLines.forEach((line: string, i: number) => {
            doc.text(line, pageWidth - margin - 45, contactY + (i * 4));
        });
        contactY += emailLines.length * 4;
    }

    if (data.personal.location) {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(122, 31, 43);
        doc.text('A', pageWidth - margin - 50, contactY);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(85, 85, 85);
        doc.text(data.personal.location, pageWidth - margin - 45, contactY);
        contactY += 4;
    }

    if (data.personal.portfolio) {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(122, 31, 43);
        doc.text('W', pageWidth - margin - 50, contactY);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(85, 85, 85);

        const portfolioLines = doc.splitTextToSize(data.personal.portfolio, 45);

        portfolioLines.forEach((line: string, i: number) => {
            doc.text(line, pageWidth - margin - 45, contactY + (i * 4));
        });

        contactY += portfolioLines.length * 4;
    }

    if (data.personal.linkedIn) {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(122, 31, 43);
        doc.text('L', pageWidth - margin - 50, contactY);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(85, 85, 85);

        const linkedInLines = doc.splitTextToSize(data.personal.linkedIn, 45);
        linkedInLines.forEach((line: string, i: number) => {
            doc.text(line, pageWidth - margin - 45, contactY + (i * 4));
        });
        contactY += linkedInLines.length * 4;
    }
    const headerHeight = Math.max(6, contactY - y);
    y += headerHeight;

    if (data.personal.jobTitle) {
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(102, 102, 102);
        doc.text(data.personal.jobTitle, margin, y);
        y += 10;
    } else {
        y += 4;
    }

    const sectionTitle = (title: string) => {
        if (!hasSpace(3)) return false;

        y += 4;
        doc.setDrawColor(229, 229, 229);
        doc.setLineWidth(0.3);
        doc.line(margin, y, pageWidth - margin, y);

        y += 8;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(122, 31, 43);
        doc.text(title, margin, y);
        y += 8;
        return true;
    };

    if (data.personal.summary && hasSpace(5)) {
        if (sectionTitle('PROFESSIONAL SUMMARY')) {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(68, 68, 68);

            wrapText(doc, data.personal.summary, contentWidth).forEach(line => {
                if (hasSpace()) {
                    doc.text(line, margin, y);
                    y += 4.5;
                }
            });
        }
    }

    // EXPERIENCE
    if (data.experience.length > 0 && hasSpace(8)) {
        if (sectionTitle('WORK EXPERIENCE')) {
            data.experience.forEach(exp => {
                if (!hasSpace(6)) return;

                doc.setFont('helvetica', 'bold');
                doc.setFontSize(10);
                doc.setTextColor(0, 0, 0);
                doc.text(exp.company, margin, y);

                const dateStr = formatDateRange(exp.startDate, exp.endDate, exp.current);
                if (dateStr) {
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(9);
                    doc.setTextColor(85, 85, 85);
                    doc.text(dateStr, pageWidth - margin, y, { align: 'right' });
                }

                y += 4;

                if (hasSpace()) {
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(10);
                    doc.setTextColor(119, 119, 119);
                    doc.text(`${exp.jobTitle}${exp.location ? ' | ' + exp.location : ''}`, margin, y);
                    y += 5;
                }

                doc.setFontSize(9);
                doc.setTextColor(68, 68, 68);
                exp.responsibilities.split('\n').forEach(item => {
                    const trimmed = item.trim();
                    if (!trimmed || !hasSpace()) return;
                    const wrappedLines = doc.splitTextToSize(`• ${trimmed}`, contentWidth);

                    wrappedLines.forEach((line: string) => {
                        if (hasSpace()) {
                            doc.text(line, margin, y);
                            y += 4;
                        }
                    });
                });

                y += 6;
            });
        }
    }

    // EDUCATION
    if (data.education.length > 0) {
        if (y < maxY - 20) {
            if (sectionTitle('EDUCATION')) {
                data.education.forEach(edu => {
                    if (y >= maxY - 15) return;
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(10);
                    doc.setTextColor(0, 0, 0);
                    const institutionLines = doc.splitTextToSize(
                        edu.institution,
                        contentWidth - 50
                    );

                    doc.text(institutionLines, margin, y);

                    const dateStr = formatDateRange(
                        edu.startDate,
                        edu.endDate,
                        edu.current
                    );
                    if (dateStr) {
                        doc.setFont('helvetica', 'normal');
                        doc.setFontSize(9);
                        doc.setTextColor(85, 85, 85);
                        doc.text(dateStr, pageWidth - margin, y, { align: 'right' });
                    }

                    y += institutionLines.length * 4;

                    if (y < maxY - 5) {
                        doc.setFont('helvetica', 'normal');
                        doc.setFontSize(10);
                        doc.setTextColor(119, 119, 119);

                        const degreeText = `${edu.degree}${edu.location ? ' | ' + edu.location : ''
                            }`;

                        const degreeLines = doc.splitTextToSize(degreeText, contentWidth);

                        degreeLines.forEach((line: string) => {
                            if (y < maxY - 5) {
                                doc.text(line, margin, y);
                                y += 4;
                            }
                        });
                    }

                    if (edu.achievements && y < maxY - 10) {
                        y += 2;
                        doc.setFont('helvetica', 'normal');
                        doc.setFontSize(9);
                        doc.setTextColor(90, 90, 90);

                        const achievementLines = doc.splitTextToSize(
                            edu.achievements,
                            contentWidth
                        );

                        achievementLines.forEach((line: string) => {
                            if (y < maxY - 5) {
                                doc.text(line, margin, y);
                                y += 4;
                            }
                        });
                    }

                    y += 6;
                });
            }
        }
    }

    // SKILLS
    if (data.skills.length > 0) {

        if (!hasSpace(8)) {
            doc.addPage();
            y = 20;
        }

        if (sectionTitle('KEY SKILLS')) {

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(68, 68, 68);

            data.skills.forEach(skill => {

                const skillText = skill.category
                    ? `${skill.category}: ${skill.items}`
                    : skill.items;

                const lines = doc.splitTextToSize(
                    `• ${skillText}`,
                    contentWidth
                );

                lines.forEach((line: string) => {

                    if (y > pageHeight - 20) {
                        doc.addPage();
                        y = 20;

                        sectionTitle('KEY SKILLS');
                    }

                    doc.text(line, margin, y);
                    y += 4.5;
                });

                y += 2;
            });
        }
    }

    // Footer
    doc.setFillColor(122, 31, 43);
    doc.rect(0, pageHeight - 8, pageWidth, 8, 'F');
}

function generateCreativePDF(doc: jsPDF, data: ResumeData): void {
    let y = 20;

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const margin = 15;
    const sidebarWidth = 65;
    const gap = 10;

    const mainX = margin + sidebarWidth + gap;
    const mainWidth = pageWidth - mainX - margin;

    const checkPage = (extra = 6) => {
        if (y + extra > pageHeight - 10) {
            doc.addPage();
            y = 20;
        }
    };

    const drawDivider = () => {
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.3);
        doc.line(margin + sidebarWidth + gap / 2, 10, margin + sidebarWidth + gap / 2, pageHeight - 10);
    };

    drawDivider();

    let sy = 20;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text(data.personal.fullName || 'Your Name', margin, sy);

    sy += 7;

    if (data.personal.jobTitle) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.text(data.personal.jobTitle, margin, sy);
        sy += 8;
    }

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');

    const contact = [
        data.personal.email,
        data.personal.phone,
        data.personal.location,
        data.personal.portfolio,
        data.personal.linkedIn,
    ].filter(Boolean);

    const contactMaxWidth = sidebarWidth - 2;

    contact.forEach(item => {
        const lines = doc.splitTextToSize(item!, contactMaxWidth);

        lines.forEach((line: string) => {
            doc.text(line, margin, sy);
            sy += 4.5;
        });

        const isLinkedIn =
            data.personal.linkedIn && item === data.personal.linkedIn;

        if (isLinkedIn) {
            sy += 4;
        } else {
            sy += 1;
        }
    });

    // SKILLS
    if (data.skills.length > 0) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text('CORE SKILLS', margin, sy);

        sy += 2;

        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.2);
        doc.line(margin, sy, margin + sidebarWidth - 2, sy);

        sy += 6;

        doc.setFontSize(9);
        doc.setTextColor(50, 50, 50);

        data.skills.forEach(skill => {

            const category = skill.category
                ? `${skill.category}: `
                : '';

            const text = skill.items;

            const lines = wrapText(
                doc,
                `${category}${text}`,
                sidebarWidth - 5
            );

            lines.forEach((line, index) => {

                checkPage();

                const textX = margin + 5;

                if (index === 0 && category) {

                    doc.setFont('helvetica', 'bold');
                    doc.text(category, textX, sy);

                    const categoryWidth = doc.getTextWidth(category);

                    doc.setFont('helvetica', 'normal');

                    doc.text(
                        line.replace(category, ''),
                        textX + categoryWidth,
                        sy,
                        {
                            maxWidth: sidebarWidth - categoryWidth - 5,
                            align: 'justify'
                        }
                    );

                } else {

                    doc.setFont('helvetica', 'normal');

                    doc.text(line, textX, sy, {
                        maxWidth: sidebarWidth - 5,
                        align: 'justify'
                    });
                }

                sy += 4.5;
            });

            sy += 2;
        });
    }

    // ================= RIGHT MAIN =================
    y = 20;

    const section = (title: string) => {
        checkPage();

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text(title.toUpperCase(), mainX, y);

        y += 2;

        doc.setLineWidth(0.2);
        doc.line(mainX, y, pageWidth - margin, y);

        y += 6;
    };

    // ===== SUMMARY =====
    if (data.personal.summary) {
        section('Professional Summary');

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);

        wrapText(doc, data.personal.summary, mainWidth).forEach(line => {
            checkPage();
            doc.text(line, mainX, y);
            y += 4.5;
        });

        y += 6;
    }

    // ===== EXPERIENCE =====
    if (data.experience.length > 0) {
        section('Professional Experience');

        data.experience.forEach(exp => {
            checkPage();

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.text(exp.jobTitle, mainX, y);

            const date = formatDateRange(exp.startDate, exp.endDate, exp.current);

            if (date) {
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                doc.text(date, pageWidth - margin, y, { align: 'right' });
            }

            y += 5;

            doc.setFont('helvetica', 'italic');
            doc.setFontSize(10);
            doc.text(
                exp.location ? `${exp.company} | ${exp.location}` : exp.company,
                mainX,
                y
            );

            y += 5;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);

            exp.responsibilities.split('\n').forEach(point => {
                const clean = point.trim();
                if (!clean) return;

                const lines = wrapText(doc, clean, mainWidth - 5);

                lines.forEach((line, i) => {
                    checkPage();

                    if (i === 0) {
                        doc.text('•', mainX, y);
                        doc.text(line, mainX + 3, y);
                    } else {
                        doc.text(line, mainX + 3, y);
                    }

                    y += 4.5;
                });
            });

            y += 6;
        });
    }

    if (data.education.length > 0) {
        section('Education');

        data.education.forEach(edu => {
            checkPage();

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.text(edu.degree, mainX, y);

            const date = formatDateRange(
                edu.startDate,
                edu.endDate,
                edu.current
            );

            if (date) {
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                doc.text(date, pageWidth - margin, y, {
                    align: 'right'
                });
            }

            y += 5;

            doc.setFont('helvetica', 'italic');
            doc.setFontSize(10);
            doc.text(
                edu.location
                    ? `${edu.institution} | ${edu.location}`
                    : edu.institution,
                mainX,
                y
            );

            y += 6;
            if (edu.achievements) {
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                doc.setTextColor(0, 0, 0);

                const achievementLines = doc.splitTextToSize(
                    edu.achievements,
                    pageWidth - margin * 2
                );

                achievementLines.forEach((line: string) => {
                    checkPage();

                    doc.text(line, mainX, y);
                    y += 4.5;
                });

                y += 4;
            }
        });
    }
}

function generateMasterPDF(doc: jsPDF, data: ResumeData): void {
    let y = 20;

    const pageWidth = doc.internal.pageSize.getWidth();

    const contentWidth = 150;
    const margin = (pageWidth - contentWidth) / 2;

    const dateWidth = 40;
    const contentX = margin + dateWidth;

    const checkPage = () => {
        if (y > 275) {
            doc.addPage();
            y = 20;
        }
    };

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text(data.personal.fullName || 'Your Name', margin, y);

    y += 6;

    if (data.personal.jobTitle) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(30, 80, 180);
        doc.text(data.personal.jobTitle, margin, y);
        y += 6;
    }

    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);

    let contactY = 20;

    const contactItems = [
        data.personal.phone,
        data.personal.email,
        data.personal.linkedIn,
        data.personal.location,
        data.personal.portfolio,
    ].filter(Boolean);

    contactItems.forEach(item => {
        const lines = wrapText(doc, item!, contentWidth / 2);

        lines.forEach(line => {
            doc.text(line, margin + contentWidth, contactY, { align: 'right' });
            contactY += 4.5;
        });

        contactY += 1;
    });

    y += 14;

    const section = (title: string) => {
        checkPage();

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(30, 80, 180);
        doc.text(title.toUpperCase(), margin, y);

        y += 2;

        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.2);
        doc.line(margin, y, margin + contentWidth, y);

        y += 6;
    };

    if (data.personal.summary) {
        section('PROFESSIONAL SUMMARY');

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);

        wrapText(doc, data.personal.summary, contentWidth).forEach(line => {
            doc.text(line, margin, y);
            y += 4.5;
        });

        y += 4;
    }

    if (data.experience.length > 0) {
        section('Experience');

        data.experience.forEach(exp => {
            checkPage();

            const rawDate = formatDateRange(exp.startDate, exp.endDate, exp.current);
            const date = rawDate.replace(/\n/g, ' ');

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(110, 110, 110);

            if (date) {
                doc.text(date, margin, y, { maxWidth: dateWidth });
            }

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.text(exp.jobTitle, contentX, y);

            y += 5;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(90, 90, 90);
            doc.text(
                exp.company + (exp.location ? ` | ${exp.location}` : ''),
                contentX,
                y
            );

            y += 5;

            doc.setFontSize(9);
            doc.setTextColor(50, 50, 50);

            exp.responsibilities.split('\n').forEach(point => {
                const clean = point.trim();
                if (!clean) return;

                const lines = wrapText(doc, clean, contentWidth - dateWidth - 5);

                lines.forEach((line, i) => {
                    checkPage();

                    if (i === 0) {
                        doc.text('•', contentX, y);
                        doc.text(line, contentX + 3, y);
                    } else {
                        doc.text(line, contentX + 3, y);
                    }

                    y += 4.5;
                });
            });

            y += 6;
        });
    }

    if (data.education.length > 0) {
        section('Education');

        data.education.forEach(edu => {
            checkPage();

            const rawDate = formatDateRange(
                edu.startDate,
                edu.endDate,
                edu.current
            );

            const date = rawDate.replace(/\n/g, ' ');

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(110, 110, 110);

            if (date) {
                doc.text(date, margin, y, {
                    maxWidth: dateWidth
                });
            }

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);

            const degreeLines = doc.splitTextToSize(
                edu.degree,
                contentWidth - dateWidth - 10
            );

            doc.text(degreeLines, contentX, y);

            y += degreeLines.length * 5;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(90, 90, 90);

            const institutionText =
                edu.institution +
                (edu.location ? ` | ${edu.location}` : '');

            const institutionLines = doc.splitTextToSize(
                institutionText,
                contentWidth - dateWidth - 10
            );

            doc.text(institutionLines, contentX, y);

            y += institutionLines.length * 4.5;

            if (edu.achievements) {
                y += 2;

                doc.setFont('helvetica', 'normal');
                doc.setFontSize(8.5);
                doc.setTextColor(100, 100, 100);

                const achievementLines = doc.splitTextToSize(
                    edu.achievements,
                    contentWidth - dateWidth - 10
                );

                achievementLines.forEach((line: string) => {
                    checkPage();

                    doc.text(line, contentX, y);
                    y += 4;
                });
            }

            y += 6;
        });
    }

    if (data.skills.length > 0) {
        section('Skills');

        doc.setFontSize(9);
        doc.setTextColor(50, 50, 50);

        data.skills.forEach(skill => {

            const category = skill.category
                ? `${skill.category}: `
                : '';

            const text = skill.items;

            const lines = doc.splitTextToSize(
                `${category}${text}`,
                contentWidth - 5
            );

            lines.forEach((line: string, index: number) => {

                checkPage();

                if (index === 0) {
                    doc.text('•', margin, y);
                }

                const textX = margin + 5;

                if (index === 0 && category) {

                    doc.setFont('helvetica', 'bold');
                    doc.text(category, textX, y);

                    const categoryWidth = doc.getTextWidth(category);

                    doc.setFont('helvetica', 'normal');

                    doc.text(
                        line.replace(category, ''),
                        textX + categoryWidth,
                        y,
                        {
                            maxWidth: contentWidth - categoryWidth,
                            align: 'justify'
                        }
                    );

                } else {

                    doc.setFont('helvetica', 'normal');

                    doc.text(line, textX, y, {
                        maxWidth: contentWidth,
                        align: 'justify'
                    });
                }

                y += 5;
            });

            y += 1;
        });
    }
}

function generateClassicPDF(doc: jsPDF, data: ResumeData): void {
    let y = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text(data.personal.fullName || 'Your Name', pageWidth / 2, y, { align: 'center' });

    y += 7;

    if (data.personal.jobTitle) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text(data.personal.jobTitle, pageWidth / 2, y, { align: 'center' });
        y += 6;
    }

    doc.setFont('helvetica', 'normal');

    doc.setFontSize(9);

    const contact1 = [
        data.personal.phone,
        data.personal.email,
        data.personal.location,
    ].filter(Boolean).join(' • ');

    if (contact1) {
        doc.text(contact1, pageWidth / 2, y, { align: 'center' });
        y += 5;
    }

    const contact2 = [
        data.personal.linkedIn,
        data.personal.portfolio,
    ].filter(Boolean).join(' • ');

    if (contact2) {
        doc.text(contact2, pageWidth / 2, y, { align: 'center' });
        y += 8;
    }

    const sectionTitle = (title: string) => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text(title, margin, y);

        y += 2;
        doc.setLineWidth(0.4);
        doc.line(margin, y, pageWidth - margin, y);
        y += 6;
    };

    if (data.personal.summary) {
        sectionTitle('PROFESSIONAL SUMMARY');

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);

        wrapText(doc, data.personal.summary, contentWidth).forEach(line => {
            doc.text(line, margin, y);
            y += 4.5;
        });

        y += 4;
    }

    if (data.experience.length > 0) {
        sectionTitle('WORK EXPERIENCE');

        data.experience.forEach(exp => {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.text(exp.jobTitle, margin, y);

            const date = formatDateRange(exp.startDate, exp.endDate, exp.current);
            if (date) {
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                doc.text(date, pageWidth - margin, y, { align: 'right' });
            }

            y += 5;

            doc.setFont('helvetica', 'italic');
            doc.setFontSize(10);
            doc.text(
                exp.location ? `${exp.company} | ${exp.location}` : exp.company,
                margin,
                y
            );

            y += 5;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);

            exp.responsibilities.split('\n').forEach(point => {
                const trimmed = point.trim();
                if (!trimmed) return;

                wrapText(doc, trimmed, contentWidth - 5).forEach((line, i) => {
                    if (i === 0) {
                        doc.text(`• ${line}`, margin, y);
                    } else {
                        doc.text(line, margin + 3, y);
                    }
                    y += 4;
                });
            });

            y += 4;
        });
    }

    if (data.education.length > 0) {
        sectionTitle('EDUCATION');

        data.education.forEach(edu => {

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.text(edu.degree, margin, y);

            const date = formatDateRange(
                edu.startDate,
                edu.endDate,
                edu.current
            );

            if (date) {
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                doc.text(date, pageWidth - margin, y, {
                    align: 'right'
                });
            }

            y += 5;

            doc.setFont('helvetica', 'italic');
            doc.setFontSize(10);
            doc.text(
                edu.location
                    ? `${edu.institution} | ${edu.location}`
                    : edu.institution,
                margin,
                y
            );

            y += 6;

            if (edu.achievements && edu.achievements.trim()) {
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                doc.setTextColor(0, 0, 0);

                const achievementLines = doc.splitTextToSize(
                    edu.achievements,
                    pageWidth - margin * 2
                );

                achievementLines.forEach((line: string) => {
                    doc.text(line, margin, y);
                    y += 4.5;
                });

                y += 4;
            }
        });
    }

    if (data.skills.length > 0) {
        sectionTitle('SKILLS');

        data.skills.forEach(skill => {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.text(`${skill.category}:`, margin, y);

            doc.setFont('helvetica', 'normal');

            const lines = wrapText(doc, skill.items, contentWidth - 40);
            doc.text(lines[0], margin + 40, y);

            for (let i = 1; i < lines.length; i++) {
                y += 5;
                doc.text(lines[i], margin + 40, y);
            }

            y += 6;
        });
    }
}

function generateWozberPDF(doc: jsPDF, data: ResumeData): void {
    let y = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);

    const fullName = data.personal.fullName || 'Your Name';
    const [firstName, ...lastNameParts] = fullName.split(' ');
    const lastName = lastNameParts.join(' ');

    doc.text(firstName, margin, y);

    doc.text(lastName, margin, y + 8);

    const contactLines: string[] = [];
    if (data.personal.phone) contactLines.push(data.personal.phone);
    if (data.personal.email) contactLines.push(data.personal.email);
    if (data.personal.location) contactLines.push(data.personal.location);
    if (data.personal.linkedIn) contactLines.push(data.personal.linkedIn);
    if (data.personal.portfolio) contactLines.push(data.personal.portfolio);

    let contactY = y;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);

    contactLines.forEach(line => {
        doc.text(line, pageWidth - margin, contactY, { align: 'right' });
        contactY += 4;
    });

    const headerHeight = Math.max(6, contactLines.length * 4);
    y += headerHeight;

    if (data.personal.jobTitle) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.text(data.personal.jobTitle, margin, y);
        y += 2;

        doc.setLineWidth(0.2);
        doc.setDrawColor(180, 180, 180);
        doc.line(margin, y, pageWidth - margin, y);

        y += 8;
    } else {
        y += 4;
    }

    const sectionTitle = (title: string) => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text(title, margin, y);

        y += 2;

        doc.setLineWidth(0.3);
        doc.setDrawColor(0, 0, 0);
        doc.line(margin, y, pageWidth - margin, y);

        y += 6;
    };

    if (data.personal.summary) {
        sectionTitle('PROFESSIONAL SUMMARY');

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);

        wrapText(doc, data.personal.summary, contentWidth).forEach(line => {
            doc.text(line, margin, y);
            y += 4.5;
        });

        y += 4;
    }

    if (data.experience.length > 0) {
        sectionTitle('EXPERIENCE');

        data.experience.forEach(exp => {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.text(exp.jobTitle, margin, y);

            const date = formatDateRange(exp.startDate, exp.endDate, exp.current);
            if (date) {
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                doc.text(date, pageWidth - margin, y, { align: 'right' });
            }

            y += 4;

            doc.setFont('helvetica', 'italic');
            doc.setFontSize(10);
            doc.text(
                exp.location ? `${exp.company} | ${exp.location}` : exp.company,
                margin,
                y
            );

            y += 5;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);

            exp.responsibilities.split('\n').forEach(point => {
                const trimmed = point.trim();
                if (!trimmed) return;

                wrapText(doc, trimmed, contentWidth).forEach(line => {
                    doc.text(`• ${line}`, margin, y);
                    y += 4;
                });
            });

            y += 4;
        });
    }

    if (data.education.length > 0) {
        sectionTitle('EDUCATION');

        data.education.forEach(edu => {

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.text(edu.degree, margin, y);

            const date = formatDateRange(
                edu.startDate,
                edu.endDate,
                edu.current
            );

            if (date) {
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                doc.text(date, pageWidth - margin, y, {
                    align: 'right'
                });
            }

            y += 4;

            doc.setFont('helvetica', 'italic');
            doc.setFontSize(10);
            doc.text(
                edu.location
                    ? `${edu.institution} | ${edu.location}`
                    : edu.institution,
                margin,
                y
            );

            y += 6;

            if (edu.achievements && edu.achievements.trim()) {
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                doc.setTextColor(0, 0, 0);

                const achievementLines = doc.splitTextToSize(
                    edu.achievements,
                    pageWidth - margin * 2
                );

                achievementLines.forEach((line: string) => {
                    doc.text(line, margin, y);
                    y += 4.5;
                });

                y += 4;
            }
        });
    }

    if (data.skills.length > 0) {
        sectionTitle('SKILLS');

        doc.setFontSize(10);

        data.skills.forEach(skill => {

            const category = `${skill.category}:`;
            const items = Array.isArray(skill.items)
                ? skill.items.join(' ')
                : skill.items;

            doc.setFont('helvetica', 'bold');
            doc.text(category, margin, y);

            const categoryWidth = doc.getTextWidth(category + ' ');

            doc.setFont('helvetica', 'normal');

            const wrappedItems = doc.splitTextToSize(
                items,
                pageWidth - margin * 2 - categoryWidth
            );

            doc.text(wrappedItems[0], margin + categoryWidth, y);

            let lineY = y;
            for (let i = 1; i < wrappedItems.length; i++) {
                lineY += 5;
                doc.text(wrappedItems[i], margin, lineY);
            }

            y = lineY + 5;
        });
    }
}

function generateMinimalPDF(doc: jsPDF, data: ResumeData): void {
    let y = 25;

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 22;
    const width = pageWidth - margin * 2;

    const checkPage = (extra = 8) => {
        if (y + extra > 280) {
            doc.addPage();
            y = 25;
        }
    };

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text(data.personal.fullName || 'Your Name', margin, y);

    y += 8;

    if (data.personal.jobTitle) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(90, 90, 90);
        doc.text(data.personal.jobTitle, margin, y);
        y += 10;
    }

    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);

    const contact = [
        data.personal.email,
        data.personal.phone,
        data.personal.location,
        data.personal.linkedIn,
        data.personal.portfolio,
    ].filter(Boolean);

    const contactText = contact.join(' • ');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);

    doc.text(contactText, pageWidth / 2, y, {
        align: 'center',
        maxWidth: pageWidth - margin * 2,
    });

    y += 10;

    const section = (title: string) => {
        checkPage();

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);

        doc.text(title.toUpperCase(), margin, y);
        y += 7;
    };

    if (data.personal.summary) {
        section('Professional Summary');

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(70, 70, 70);

        wrapText(doc, data.personal.summary, width).forEach(line => {
            checkPage();
            doc.text(line, margin, y);
            y += 5;
        });

        y += 6;
    }

    if (data.experience.length > 0) {
        section('Experience');

        data.experience.forEach(exp => {
            checkPage();

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.setTextColor(0, 0, 0);
            doc.text(exp.jobTitle, margin, y);

            const date = formatDateRange(exp.startDate, exp.endDate, exp.current);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(120, 120, 120);

            if (date) {
                doc.text(date, pageWidth - margin, y, { align: 'right' });
            }

            y += 5;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(90, 90, 90);

            doc.text(
                exp.location ? `${exp.company} • ${exp.location}` : exp.company,
                margin,
                y
            );

            y += 6;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(70, 70, 70);

            exp.responsibilities.split('\n').forEach(point => {
                const clean = point.trim();
                if (!clean) return;

                wrapText(doc, clean, width - 5).forEach(line => {
                    checkPage();
                    doc.text('• ' + line, margin + 2, y);
                    y += 4.5;
                });
            });

            y += 7;
        });
    }

    if (data.education.length > 0) {
        section('Education');

        data.education.forEach(edu => {
            checkPage();

            doc.setTextColor(0, 0, 0);

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);

            const degreeLines = doc.splitTextToSize(
                edu.degree,
                width - 30
            );

            doc.text(degreeLines, margin, y);

            const date = formatDateRange(
                edu.startDate,
                edu.endDate,
                edu.current
            );

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(120, 120, 120);

            if (date) {
                doc.text(date, pageWidth - margin, y, {
                    align: 'right'
                });
            }

            y += degreeLines.length * 5;

            doc.setTextColor(90, 90, 90);
            doc.setFontSize(10);

            const eduLine = edu.location
                ? `${edu.institution} • ${edu.location}`
                : edu.institution;

            const institutionLines = doc.splitTextToSize(
                eduLine,
                width
            );

            doc.text(institutionLines, margin, y);

            y += institutionLines.length * 4.5;

            if (edu.achievements) {
                y += 2;

                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                doc.setTextColor(95, 95, 95);

                const achievementLines = doc.splitTextToSize(
                    edu.achievements,
                    width
                );

                achievementLines.forEach((line: string) => {
                    checkPage();

                    doc.text(line, margin, y);
                    y += 4;
                });
            }

            y += 8;
        });
    }

    if (data.skills.length > 0) {
        section('Skills');

        doc.setFontSize(10);
        doc.setTextColor(70, 70, 70);

        data.skills.forEach(skill => {
            checkPage();

            const category = `${skill.category}:`;
            const items = Array.isArray(skill.items)
                ? skill.items.join(' ')
                : skill.items;

            doc.setFont('helvetica', 'bold');
            doc.text(category, margin, y);

            const categoryWidth = doc.getTextWidth(category + ' ');

            doc.setFont('helvetica', 'normal');

            const wrappedItems = doc.splitTextToSize(
                items,
                pageWidth - margin * 2 - categoryWidth
            );

            doc.text(wrappedItems[0], margin + categoryWidth, y);

            let lineY = y;
            for (let i = 1; i < wrappedItems.length; i++) {
                lineY += 5;
                doc.text(wrappedItems[i], margin, lineY);
            }

            y = lineY + 5;
        });

        y += 2;
    }
}

function generateTwoColumnPDF(
    doc: jsPDF,
    data: ResumeData,
    r: number,
    g: number,
    b: number
): void {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const sidebarWidth = 65;
    const mainMargin = sidebarWidth + 15;
    const sidebarMargin = 12;
    const mainContentWidth = pageWidth - mainMargin - 15;

    doc.setFillColor(r, g, b);
    doc.rect(0, 0, sidebarWidth, pageHeight, 'F');

    let sidebarY = 20;
    let mainY = 20;

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');

    const fullNameLines = wrapText(
        doc,
        data.personal.fullName || 'Your Name',
        sidebarWidth - 2 * sidebarMargin
    );

    fullNameLines.forEach(line => {
        doc.text(line, sidebarMargin, sidebarY);
        sidebarY += 6;
    });

    sidebarY += 2;

    if (data.personal.jobTitle && data.personal.jobTitle.trim()) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');

        const jobTitleLines = wrapText(
            doc,
            data.personal.jobTitle,
            sidebarWidth - 2 * sidebarMargin
        );

        jobTitleLines.forEach(line => {
            doc.text(line, sidebarMargin, sidebarY);
            sidebarY += 5;
        });

        sidebarY += 4;
    }

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    if (data.personal.phone) {
        doc.text(data.personal.phone, sidebarMargin, sidebarY);
        sidebarY += 5;
    }
    if (data.personal.email) {
        const emailLines = doc.splitTextToSize(
            data.personal.email,
            sidebarWidth - 2 * sidebarMargin
        );
        emailLines.forEach((line: any) => {
            doc.text(line, sidebarMargin, sidebarY);
            sidebarY += 5;
        });
    }
    if (data.personal.location) {
        doc.text(data.personal.location, sidebarMargin, sidebarY);
        sidebarY += 5;
    }
    if (data.personal.linkedIn) {
        const linkedInLines = doc.splitTextToSize(
            data.personal.linkedIn,
            sidebarWidth - 2 * sidebarMargin
        );

        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');

        linkedInLines.forEach((line: string) => {
            doc.text(line, sidebarMargin, sidebarY);
            sidebarY += 4;
        });
    }

    if (data.personal.portfolio) {
        const portfolioLines = doc.splitTextToSize(
            data.personal.portfolio,
            sidebarWidth - 2 * sidebarMargin
        );

        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');

        portfolioLines.forEach((line: string) => {
            doc.text(line, sidebarMargin, sidebarY);
            sidebarY += 4;
        });
    }

    sidebarY += 8;

    if (data.skills.length > 0) {
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('SKILLS', sidebarMargin, sidebarY);
        sidebarY += 8;

        data.skills.forEach(skill => {
            doc.setFontSize(9);
            doc.setFont('helvetica', 'bold');
            doc.text(skill.category, sidebarMargin, sidebarY);
            sidebarY += 5;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            const skillLines = wrapText(doc, skill.items, sidebarWidth - 2 * sidebarMargin);
            skillLines.forEach(line => {
                doc.text(line, sidebarMargin, sidebarY);
                sidebarY += 4;
            });
            sidebarY += 4;
        });
    }

    doc.setTextColor(0, 0, 0);

    if (data.personal.summary) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(r, g, b);
        doc.text('PROFESSIONAL SUMMARY', mainMargin, mainY);

        doc.setDrawColor(r, g, b);
        doc.setLineWidth(0.8);
        doc.line(mainMargin, mainY + 2, pageWidth - 15, mainY + 2);

        mainY += 8;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(40, 40, 40);
        const summaryLines = wrapText(doc, data.personal.summary, mainContentWidth);
        summaryLines.forEach(line => {
            doc.text(line, mainMargin, mainY);
            mainY += 5;
        });

        mainY += 5;
    }

    if (data.experience.length > 0) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(r, g, b);
        doc.text('WORK EXPERIENCE', mainMargin, mainY);

        doc.setDrawColor(r, g, b);
        doc.setLineWidth(0.8);
        doc.line(mainMargin, mainY + 2, pageWidth - 15, mainY + 2);

        mainY += 10;

        data.experience.forEach(exp => {

            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text(exp.jobTitle, mainMargin, mainY);

            const dateRange = formatDateRange(exp.startDate, exp.endDate, exp.current);
            if (dateRange) {
                doc.setFontSize(9);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(100, 100, 100);
                doc.text(dateRange, pageWidth - 15, mainY, { align: 'right' });
            }

            mainY += 5;

            doc.setFontSize(10);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(80, 80, 80);
            const companyText = exp.location?.trim()
                ? `${exp.company} | ${exp.location}`
                : exp.company;
            doc.text(companyText, mainMargin, mainY);

            mainY += 6;

            if (exp.responsibilities) {
                doc.setFontSize(9);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(60, 60, 60);

                const bulletPoints = exp.responsibilities.split('\n');

                bulletPoints.forEach(point => {
                    const trimmed = point.trim();
                    if (!trimmed) return;

                    const lines = wrapText(doc, trimmed, mainContentWidth - 5);

                    lines.forEach((line, index) => {
                        if (index === 0) {
                            doc.text(`• ${line}`, mainMargin, mainY);
                        } else {
                            doc.text(line, mainMargin + 3, mainY);
                        }

                        mainY += 4.5;
                    });
                });
            }

            mainY += 5;
        });
    }

    if (data.education.length > 0) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(r, g, b);
        doc.text('EDUCATION', mainMargin, mainY);

        doc.setDrawColor(r, g, b);
        doc.setLineWidth(0.8);
        doc.line(mainMargin, mainY + 2, pageWidth - 15, mainY + 2);

        mainY += 10;

        data.education.forEach(edu => {
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text(edu.degree, mainMargin, mainY);

            const dateRange = formatDateRange(edu.startDate, edu.endDate, edu.current);
            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(100, 100, 100);
            doc.text(dateRange, pageWidth - 15, mainY, { align: 'right' });

            mainY += 5;

            doc.setFontSize(10);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(80, 80, 80);
            const institutionText = edu.location
                ? `${edu.institution} | ${edu.location}`
                : edu.institution;
            doc.text(institutionText, mainMargin, mainY);

            mainY += 5;

            if (edu.achievements) {
                doc.setFontSize(9);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(60, 60, 60);
                const achievementLines = wrapText(doc, edu.achievements, mainContentWidth);
                achievementLines.forEach(line => {
                    doc.text(line, mainMargin, mainY);
                    mainY += 4.5;
                });
            }

            mainY += 5;
        });
    }
}

function generateSofaaPDF(doc: jsPDF, data: ResumeData): void {
    let y = 20;

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    const bottomMargin = 25;
    const maxY = pageHeight - bottomMargin;

    const checkPage = (extra = 0) => {
        if (y + extra > maxY) {
            doc.addPage();
            y = 20;
        }
    };

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(data.personal.fullName || 'Your Name', margin, y);

    y += 7;

    if (data.personal.jobTitle) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.text(data.personal.jobTitle, margin, y);
        y += 2;

        doc.setLineWidth(0.2);
        doc.setDrawColor(180, 180, 180);
        doc.line(margin, y, pageWidth - margin, y);

        y += 8;
    } else {
        y += 4;
    }

    const contact = [
        data.personal.email,
        data.personal.phone,
        data.personal.location,
        data.personal.linkedIn,
        data.personal.portfolio,
    ].filter(Boolean).join(' | ');

    if (contact) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);

        const contactLines = wrapText(doc, contact, contentWidth);

        contactLines.forEach(line => {
            checkPage(5);
            doc.text(line, margin, y);
            y += 5;
        });

        y += 3;
    }

    const section = (title: string) => {
        checkPage(10);

        const text = title.toUpperCase();

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);

        const textWidth = doc.getTextWidth(text);
        const boxHeight = 6;

        doc.setFillColor(240, 242, 245);
        doc.rect(margin - 2, y - 4, textWidth + 6, boxHeight, 'F');

        doc.setTextColor(20, 20, 20);
        doc.text(text, margin, y);

        doc.setTextColor(0, 0, 0);

        y += 10;
    };

    if (data.personal.summary) {
        section('Summary');

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);

        wrapText(doc, data.personal.summary, contentWidth).forEach(line => {
            checkPage();
            doc.text(line, margin, y);
            y += 5;
        });

        y += 4;
    }

    if (data.experience.length > 0) {
        section('Experience');

        data.experience.forEach(exp => {
            checkPage(12);

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.text(exp.jobTitle || 'Job Title', margin, y);

            const date = formatDateRange(exp.startDate, exp.endDate, exp.current);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);

            if (date) {
                doc.text(date, pageWidth - margin, y, { align: 'right' });
            }

            y += 3;

            doc.setDrawColor(210, 210, 210);
            doc.setLineWidth(0.3);
            doc.line(margin, y, pageWidth - margin, y);

            y += 4;

            doc.setFontSize(10);

            const companyLine = exp.location
                ? `${exp.company} - ${exp.location}`
                : exp.company;

            doc.text(companyLine, margin, y);
            y += 5;

            doc.setFontSize(9);

            exp.responsibilities.split('\n').forEach(point => {
                const clean = point.trim();
                if (!clean) return;

                wrapText(doc, clean, contentWidth).forEach(line => {
                    checkPage();
                    doc.text(`- ${line}`, margin + 2, y);
                    y += 4.5;
                });
            });

            y += 6;
        });
    }

    if (data.education.length > 0) {
        section('Education');

        data.education.forEach(edu => {
            checkPage(12);

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.text(edu.degree, margin, y);

            const date = formatDateRange(
                edu.startDate,
                edu.endDate,
                edu.current
            );

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(9);
            doc.setDrawColor(210, 210, 210);

            if (date) {
                doc.text(date, pageWidth - margin, y, {
                    align: 'right'
                });
            }

            y += 3;

            doc.setDrawColor(210, 210, 210);
            doc.setLineWidth(0.3);
            doc.line(margin, y, pageWidth - margin, y);

            y += 4;

            doc.text(
                edu.institution +
                (edu.location ? ` - ${edu.location}` : ''),
                margin,
                y
            );

            y += 6;

            if (edu.achievements && edu.achievements.trim()) {
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);

                const achievementLines = doc.splitTextToSize(
                    edu.achievements,
                    contentWidth
                );

                achievementLines.forEach((line: string) => {
                    checkPage();
                    doc.text(line, margin, y);
                    y += 4.5;
                });

                y += 4;
            }
        });
    }

    if (data.skills.length > 0) {
        section('Skills');

        doc.setFontSize(10);

        data.skills.forEach(skill => {
            checkPage();

            const category = `${skill.category}:`;
            const items = Array.isArray(skill.items)
                ? skill.items.join(' ')
                : skill.items;

            doc.setFont('helvetica', 'bold');
            doc.text(category, margin, y);

            const categoryWidth = doc.getTextWidth(category + ' ');

            doc.setFont('helvetica', 'normal');

            const wrappedItems = doc.splitTextToSize(
                items,
                pageWidth - margin * 2 - categoryWidth
            );

            doc.text(wrappedItems[0], margin + categoryWidth, y);

            let lineY = y;
            for (let i = 1; i < wrappedItems.length; i++) {
                lineY += 5;
                doc.text(wrappedItems[i], margin, lineY);
            }

            y = lineY + 5;
        });

        y += 2;
    }
}