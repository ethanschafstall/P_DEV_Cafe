<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Affichage des produits</title>
</head>
<body>
    <?php
    //Connection
    $connect = mysqli_connect(
        'db', # service name
        'php_docker', # username
        'password', # password
        'php_docker' # db table
    );

    $table_name = "transactions";

    $query = "SELECT * FROM $table_name";

    $response = mysqli_query($connect, $query);

    echo "<strong>$table_name:</strong><br>";

    // Créer une variable JavaScript contenant les données des produits
    echo "<script>";
    echo "var products = [";
    while($i = mysqli_fetch_assoc($response)) {
        echo "{";
        echo "'montant_total': '" . $i['montant_total'] . "',";
        echo "'quantite': '" . $i['quantite'] . "',";
        echo "'date_transaction': '" . $i['date_transaction'] . "'";
        echo "},";
    }
    echo "];";
    echo "</script>";
    ?>

    <button onclick="onClickButton()">Cliquez ici</button>

    <script>
        function onClickButton() {
            // Récupérer les données du premier produit
            var product = products[2];
            // Afficher une alerte avec les détails du produit
            alert("montant_total: " + product.montant_total + "\nquantite: " + product.quantite + "\ndate_transaction: " + product.date_transaction);
        }
    </script>
</body>
</html>
