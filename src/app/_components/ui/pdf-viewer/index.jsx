import { Document, Page, pdfjs } from "react-pdf";
import { useState, useEffect, useRef } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./style.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/js/pdf.worker.min.mjs";


export function PDFViewer({
  fileName,
  filePath,
  pdfUrl,
  title,
  height = "600px",
  width = "100%"
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const containerRef = useRef(null);

  // Support both old (pdfUrl) and new (fileName/filePath) prop formats
  const actualFilePath = filePath || pdfUrl;
  const actualFileName = fileName || title || "document";

  // Add timeout fallback to prevent infinite loading
  useEffect(() => {
    if (!actualFilePath) {
      setError("No PDF file path provided");
      setIsLoading(false);
      return;
    }

    // Reset states when filePath changes
    setIsLoading(true);
    setError(null);
    setNumPages(null);
    setCurrentPage(1);

    // Set timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      setIsLoading(current => {
        if (current) {
          setError("PDF loading timeout. Please check if the file exists and is accessible.");
          return false;
        }
        return current;
      });
    }, 10000); // 10 second timeout

    return () => clearTimeout(loadingTimeout);
  }, [actualFilePath]);

  function onDocumentLoadSuccess({ numPages: totalPages }) {
    setNumPages(totalPages);
    setIsLoading(false);
    setError(null); // Clear any previous errors
  }

  function onDocumentLoadError(err) {
    console.error('PDF loading error:', err);
    setError(`Failed to load PDF: ${err.message || err}`);
    setIsLoading(false);
    setNumPages(null);
  }

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.5));
  };

  const goToNextPage = () => {
    if (numPages && currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const downloadPdf = () => {
    if (actualFilePath) {
      const link = document.createElement("a");
      link.href = actualFilePath;
      link.download = actualFileName + ".pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const printPdf = () => {
    if (actualFilePath) {
      const printWindow = window.open(actualFilePath);
      if (printWindow) {
        printWindow.addEventListener("load", () => {
          printWindow.print();
        });
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
        setFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setFullscreen(false);
      }
    }
  };

  return (
    <div ref={containerRef} className="pdf-viewer-container" style={{ height, width }}>
      <div className="pdf-viewer-toolbar">
        <div className="pdf-viewer-control-group">
          <button
            className="pdf-viewer-button"
            disabled={currentPage <= 1}
            title="Previous Page"
            onClick={goToPreviousPage}
          >
            ←
          </button>
          <div className="pdf-viewer-page-nav">
            <span>Page </span>
            <input
              className="pdf-viewer-page-input"
              max={numPages || 1}
              min={1}
              type="number"
              value={currentPage}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value && numPages && value > 0 && value <= numPages) {
                  setCurrentPage(value);
                }
              }}
            />
            <span> of {numPages || "-"}</span>
          </div>
          <button
            className="pdf-viewer-button"
            disabled={!numPages || currentPage >= numPages}
            title="Next Page"
            onClick={goToNextPage}
          >
            →
          </button>
        </div>

        <div className="pdf-viewer-control-group">
          <button
            className="pdf-viewer-button"
            disabled={scale <= 0.5}
            title="Zoom Out"
            onClick={zoomOut}
          >
            -
          </button>
          <div className="pdf-viewer-text">
            <span>{Math.round(scale * 100)}%</span>
          </div>
          <button
            className="pdf-viewer-button"
            disabled={scale >= 3.0}
            title="Zoom In"
            onClick={zoomIn}
          >
            +
          </button>
        </div>

        <div className="pdf-viewer-control-group">
          <button className="pdf-viewer-action-button" title="Download PDF" onClick={downloadPdf}>
            <svg
              className="pdf-viewer-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            <span>Download</span>
          </button>
          <button className="pdf-viewer-action-button" title="Print PDF" onClick={printPdf}>
            <svg
              className="pdf-viewer-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            <span>Print</span>
          </button>
          <button
            className="pdf-viewer-action-button"
            title={fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            onClick={toggleFullscreen}
          >
            <svg
              className="pdf-viewer-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d={
                  fullscreen
                    ? "M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
                    : "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                }
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            <span>{fullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="pdf-viewer-loading">
          <div className="pdf-viewer-loading-content">
            <svg
              className="pdf-viewer-spinner"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="pdf-viewer-spinner-circle"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="pdf-viewer-spinner-path"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
              ></path>
            </svg>
            <span className="pdf-viewer-loading-text">Loading PDF...</span>
          </div>
        </div>
      )}
      {error && <div className="pdf-viewer-error">{error}</div>}
      <div className="pdf-viewer-content">
        {actualFilePath ? (
          <Document
            file={actualFilePath}
            loading={<div className="pdf-viewer-loading-document">Loading PDF...</div>}
            noData={<div className="pdf-viewer-no-data">No PDF file specified</div>}
            onLoadError={onDocumentLoadError}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <div className="pdf-viewer-page-container">
              <Page
                className="pdf-viewer-page"
                loading={
                  <div className="pdf-viewer-page-loading">Loading page {currentPage}...</div>
                }
                pageNumber={currentPage}
                renderAnnotationLayer={true}
                renderTextLayer={true}
                scale={scale}
              />
            </div>
          </Document>
        ) : (
          <div className="pdf-viewer-no-data">No PDF file specified</div>
        )}
      </div>
    </div>
  );
}
