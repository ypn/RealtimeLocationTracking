<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Export excel</title>
  </head>
  <style>
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #dddddd;
    }
    </style>
  <body>
    <div>
      <table id="export">
        <thead>
          <tr>
            <th>{{$mode->display_property}}</th>
            @if($mode->object_owner!=null)
              <th>{{$mode->object_owner}}</th>
            @endif
            <th>Ngày theo dõi</th>
            <th>Giờ bắt đầu</th>
            <th>Giờ kết thúc</th>
            @foreach($checkpoints as $c)
              <th>{{$c->name}}</th>
            @endforeach
          </tr>
        </thead>
        <tbody>
          @foreach($list as $l)
          <tr>
            <td>{{$l->object_tracking}}</td>
            @if($mode->object_owner!=null)
            <td>{{$l->object_info->object_owner}}</td>
            @endif
            <td>{!!"" . (new DateTime($l->created_at))->format('D,d/m/Y')!!}</td>
            <td>{{(new DateTime($l->created_at))->format('H:m:a')}}</td>
            <td>{{(new DateTime($l->ended_at))->format('H:m:a')}}</td>

            @foreach($l->time_checkpoints as $s)
              <td>{{$s}}</td>
            @endforeach

          </tr>
          @endforeach
        </tbody>
      </table>
    </div>

  <script
  src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
  integrity="sha256-3edrmyuQ0w65f8gfBsqowzjJe2iM6n0nKciPUp8y+7E="
  crossorigin="anonymous"></script>
  <script src="/js/xlsx.core.min.js"></script>
  <script src="/js/FileServer.js"></script>
  <script src="/js/tableexport.min.js"></script>
  <script type="text/javascript">
  $(document).ready(function(){
    TableExport.prototype.typeConfig.date.assert = function(value) { return false; };
    TableExport(document.getElementById("export"), {
      headings: true,                              // (Boolean), display table headers (th or td elements) in the <thead>, (default: true)
      footers: true,                              // (Boolean), display table footers (th or td elements) in the <tfoot>, (default: false)
      formats: ['xlsx', 'txt'],            // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
      filename: 'bao_cao_theo_doi',                             // (id, String), filename for the downloaded file, (default: 'id')
      bootstrap: false,                           // (Boolean), style buttons using bootstrap, (default: true)
      exportButtons: true,                        // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)
      position: 'bottom',                         // (top, bottom), position of the caption element relative to table, (default: 'bottom')
      ignoreRows: null,                           // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
      ignoreCols: null,                           // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
      trimWhitespace: true                        // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s) (default: false)
    });
    });
  </script>
</body>
</html>
