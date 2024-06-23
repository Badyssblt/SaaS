<?php


namespace App\Service;

use App\Entity\Employees;
use Dompdf\Dompdf;
use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;

class PdfGeneratorService
{
    private $twig;
    private $dompdf;
    private $employeeService;

    public function __construct(Environment $twig, EmployeeService $employeeService)
    {
        $this->twig = $twig;
        $this->dompdf = new Dompdf();
        $this->employeeService = $employeeService;
    }

    public function generatePdf($htmlContent): Response
    {
        $this->dompdf->loadHtml($htmlContent);

        $this->dompdf->render();

        $output = $this->dompdf->output();

        return new Response($output, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="filename.pdf"',
        ]);
    }

    public function generatePayrollPdf(Employees $employee): Response
    {
        $currentMonth = date('n');
        $currentYear = date('Y');

        $hours = $this->employeeService->getHoursInMonth($employee, $currentMonth, $currentYear);

        $employeeData = [
            'employee' => $employee,
            'hours' => $hours
        ];
        return $this->generatePdfFromTwigTemplate('employee/payroll.html.twig', $employeeData);
    }

    private function generatePdfFromTwigTemplate($template, $data): Response
    {
        $htmlContent = $this->twig->render($template, $data);
        return $this->generatePdf($htmlContent);
    }
}
