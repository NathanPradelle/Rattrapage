<!DOCTYPE html>
<html>
<head>
    <title>Rappel d'abonnement</title>
</head>
<body>
<h1>Bonjour, {{ $userName }}!</h1>
<p>Votre abonnement expire le {{ $expiryDate }}.</p>
<p>Pour renouveler votre abonnement, veuillez visiter notre <a href="{{ route('abonnement.payment.page') }}">page d'abonnement</a>.</p>
<p>Merci de rester avec nous!</p>
</body>
</html>
